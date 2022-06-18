import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { LocaleContextProvider } from "./providers/LocaleProvider";
import { StrictMode } from "react";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const acceptLanguage = request.headers.get("accept-language") || "da-DK";
  const locales = parseAcceptLanguage(acceptLanguage, {
    validate: Intl.DateTimeFormat.supportedLocalesOf,
  });

  const markup = renderToString(
    <StrictMode>
      <LocaleContextProvider locales={locales}>
        <RemixServer context={remixContext} url={request.url} />
      </LocaleContextProvider>
    </StrictMode>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
