import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import PrivacyPolicyUA from "./pages/PrivacyPolicyUA";
import PrivacyPolicyEN from "./pages/PrivacyPolicyEN";
import TermsOfUseUA from "./pages/TermsOfUseUA";
import TermsOfUseEN from "./pages/TermsOfUseEN";
import AccountDeletion from "./pages/AccountDeletion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-ua" element={<PrivacyPolicyUA />} />
            <Route path="/privacy-en" element={<PrivacyPolicyEN />} />
            <Route path="/terms-ua" element={<TermsOfUseUA />} />
            <Route path="/terms-en" element={<TermsOfUseEN />} />
            <Route path="/account-deletion" element={<AccountDeletion />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
