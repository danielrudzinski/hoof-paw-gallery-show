import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import PortfolioZwierzeta from "./pages/PortfolioZwierzeta";
import PortfolioLudzie from "./pages/PortfolioLudzie";
import PortfolioKonie from "./pages/PortfolioKonie";
import Reportaz from "./pages/Reportaz";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/psyikoty" element={<PortfolioZwierzeta />} />
          <Route path="/portfolio/konie-jezdziectwo" element={<PortfolioKonie />} />
          <Route path="/miniaturki-reportaz" element={<Reportaz />} />
          <Route path="/cennik" element={<Pricing />} />
          <Route path="/kontakt" element={<Services />} />
          <Route path="/o-mnie" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;