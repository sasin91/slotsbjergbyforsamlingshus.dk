import { RemixBrowser } from "@remix-run/react";
import { StrictMode } from "react";
import { hydrate } from "react-dom";
import { LocaleContextProvider } from "./providers/LocaleProvider";
const locales = [...window.navigator.languages];

hydrate(
  <StrictMode>
    <LocaleContextProvider locales={locales}>
      <RemixBrowser />
    </LocaleContextProvider>
  </StrictMode>,
  document
);
