import { useState, useEffect, useCallback } from 'react';

interface ImageCacheEntry {
  url: string;
  blob: Blob;
  timestamp: number;
  size: number;
}

export const useImageCache = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [db, setDb] = useState<IDBDatabase | null>(null);

  const DB_NAME = 'ImageCache';
  const DB_VERSION = 1;
  const STORE_NAME = 'images';
  const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  useEffect(() => {
    const initDB = async () => {
      if (!('indexedDB' in window)) {
        console.warn('IndexedDB not supported');
        return;
      }

      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => {
          console.error('Failed to open IndexedDB');
        };

        request.onsuccess = () => {
          setDb(request.result);
          setIsSupported(true);
        };

        request.onupgradeneeded = (event) => {
          const database = (event.target as IDBOpenDBRequest).result;
          if (!database.objectStoreNames.contains(STORE_NAME)) {
            const store = database.createObjectStore(STORE_NAME, { keyPath: 'url' });
            store.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
      } catch (error) {
        console.error('IndexedDB initialization error:', error);
      }
    };

    initDB();
  }, []);

  const cacheImage = useCallback(async (url: string, blob: Blob): Promise<void> => {
    if (!db || !isSupported) return;

    try {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const entry: ImageCacheEntry = {
        url,
        blob,
        timestamp: Date.now(),
        size: blob.size
      };

      await new Promise<void>((resolve, reject) => {
        const request = store.put(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Clean up old entries if needed
      await cleanupCache();
    } catch (error) {
      console.error('Failed to cache image:', error);
    }
  }, [db, isSupported]);

  const getCachedImage = useCallback(async (url: string): Promise<string | null> => {
    if (!db || !isSupported) return null;

    try {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      const entry = await new Promise<ImageCacheEntry | null>((resolve, reject) => {
        const request = store.get(url);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });

      if (!entry) return null;

      // Check if entry is expired
      if (Date.now() - entry.timestamp > CACHE_DURATION) {
        await deleteCachedImage(url);
        return null;
      }

      return URL.createObjectURL(entry.blob);
    } catch (error) {
      console.error('Failed to get cached image:', error);
      return null;
    }
  }, [db, isSupported]);

  const deleteCachedImage = useCallback(async (url: string): Promise<void> => {
    if (!db || !isSupported) return;

    try {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(url);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to delete cached image:', error);
    }
  }, [db, isSupported]);

  const cleanupCache = useCallback(async (): Promise<void> => {
    if (!db || !isSupported) return;

    try {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');

      const entries = await new Promise<ImageCacheEntry[]>((resolve, reject) => {
        const request = index.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      // Calculate total size
      const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0);

      if (totalSize > MAX_CACHE_SIZE) {
        // Sort by timestamp (oldest first)
        entries.sort((a, b) => a.timestamp - b.timestamp);
        
        let currentSize = totalSize;
        let index = 0;

        // Delete oldest entries until we're under the limit
        while (currentSize > MAX_CACHE_SIZE * 0.8 && index < entries.length) {
          await deleteCachedImage(entries[index].url);
          currentSize -= entries[index].size;
          index++;
        }
      }

      // Delete expired entries
      const expiredThreshold = Date.now() - CACHE_DURATION;
      const expiredEntries = entries.filter(entry => entry.timestamp < expiredThreshold);
      
      for (const entry of expiredEntries) {
        await deleteCachedImage(entry.url);
      }
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
    }
  }, [db, isSupported]);

  const clearCache = useCallback(async (): Promise<void> => {
    if (!db || !isSupported) return;

    try {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }, [db, isSupported]);

  return {
    isSupported,
    cacheImage,
    getCachedImage,
    deleteCachedImage,
    cleanupCache,
    clearCache
  };
};