import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { NextWebVitalsMetric } from "next/app";
import { GoogleAnalytics, event } from "nextjs-google-analytics";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { AppProps } from "next/app";
import Layout from "@/components/template/layout";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // @ts-expect-error - `name` is not defined in the `NextWebVitalsMetric` type
  event(name, {
    category:
      metric.label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ), // values must be integers
    label: metric.id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </Layout>
  );
}
