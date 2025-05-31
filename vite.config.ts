import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Enable compression for development server
    compress: true,
    // Fix service worker MIME type in development
    middlewareMode: false,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable source maps for better debugging (disable in production for smaller bundles)
    sourcemap: mode === 'development',
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Create separate chunks for better caching
        manualChunks: {
          // Vendor dependencies that rarely change
          vendor: ['react', 'react-dom'],
          
          // Router and navigation
          router: ['react-router-dom'],
          
          // UI components and libraries
          ui: [
            '@radix-ui/react-toast',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-navigation-menu',
            'lucide-react'
          ],
          
          // Form handling
          forms: [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          
          // Animation and styling utilities
          utils: [
            'class-variance-authority',
            'clsx',
            'tailwind-merge'
          ]
        },
        
        // Use content hash for long-term caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          // Organize assets by type for better caching
          if (/\.(png|jpe?g|webp|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (/\.css$/i.test(assetInfo.name || '')) {
            return `assets/css/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
        
        // Separate JS chunks with content hash
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/]
    },
    
    // Enable minification in production
    minify: mode === 'production' ? 'esbuild' : false,
    
    // Target modern browsers for better optimization
    target: 'es2020',
    
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-toast',
      '@radix-ui/react-dialog'
    ],
    exclude: [
      // Exclude any problematic dependencies if needed
    ]
  },
  
  // Enable CSS preprocessing optimizations
  css: {
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      // Add any CSS preprocessor options if needed
    }
  },
  
  // Define environment variables for runtime
  define: {
    // Add any compile-time constants
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // Configure preview server for production builds
  preview: {
    port: 4173,
    host: "::",
    // Enable compression for preview server
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  },

  // Add custom plugin to handle service worker in development
  configureServer(server) {
    server.middlewares.use('/sw.js', (req, res, next) => {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Service-Worker-Allowed', '/');
      next();
    });
  }
}));