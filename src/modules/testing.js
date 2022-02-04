import { render as renderTl } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import en from "../translations/en.json";

export const render = (component) => {
  const queryClient = new QueryClient();
  return renderTl(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={navigator.language || "en"} messages={en}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>{component}</MemoryRouter>
        </ThemeProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
};
