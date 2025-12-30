"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]} // This allows raw HTML including iframes
      components={{
        // Style iframe specifically
        iframe: (props: React.ComponentProps<"iframe">) => (
          <div className="w-full max-w-4xl mx-auto my-8">
            <iframe
              {...props}
              className="w-full rounded-lg border border-base-300"
              loading="lazy"
              style={{
                border: "solid 1px #777",
                borderRadius: "8px",
                ...props.style,
              }}
            />
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
