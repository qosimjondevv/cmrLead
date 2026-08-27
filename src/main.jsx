import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.jsx";
import {
  ThemeProvider,
  LanguageProvider,
  AuthProvider,
  DealsProvider,
  ContactsProvider,
} from '@/context'
import { TooltipProvider } from '@/components/ui'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <DealsProvider>
            <ContactsProvider>
              <TooltipProvider delayDuration={200}>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
                <Toaster position="top-right" richColors closeButton />
              </TooltipProvider>
            </ContactsProvider>
          </DealsProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
);
