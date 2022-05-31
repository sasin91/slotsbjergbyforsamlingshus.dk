import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import { LocaleContextProvider } from "./providers/LocaleProvider";
const locales = window.navigator.languages;

hydrate(
  <LocaleContextProvider locales={locales}>
    <RemixBrowser />
  </LocaleContextProvider>,
  document
);
