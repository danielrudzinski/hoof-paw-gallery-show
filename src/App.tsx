import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import PortfolioZwierzeta from "./pages/PortfolioZwierzeta";
import PortfolioLudzie from "./pages/PortfolioLudzie";
import PortfolioKonie from "./pages/PortfolioKonie";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/psyikoty" element={<PortfolioZwierzeta />} />
          <Route path="/portfolio/konie-jezdziectwo" element={<PortfolioKonie />} />
          <Route path="/portfolio/ludzie" element={<PortfolioLudzie />} />
          <Route path="/cennik" element={<Pricing />} />
          <Route path="/oferta" element={<Services />} />
          <Route path="/o-mnie" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;