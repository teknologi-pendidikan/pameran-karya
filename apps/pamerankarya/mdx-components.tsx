import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  // Allow HTML elements including iframe
  iframe: (props) => (
    <iframe
      {...props}
      className="w-full rounded-lg border border-base-300"
      loading="lazy"
    />
  ),
  // You can also allow all HTML elements
  // But be careful with security implications
};

export function useMDXComponents(): MDXComponents {
  return components;
}
