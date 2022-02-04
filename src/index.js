import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { Layout } from "./components/Layout";
import Index from "./pages";
import About from "./pages/about";
import en from "./translations/en.json";
import { theme } from "./theme";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={navigator.language || "en"} messages={en}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </IntlProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
