import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export interface MarkdownContainerProps {
  markdown: string;
}

/**
 * Markdown container sanitizes and renders markdown text.
 *
 * @param props.markdown
 */
const MarkdownContainer: React.FC<MarkdownContainerProps> = ({ markdown }) => {
  const htmlFromMarkdown = marked.parse(markdown) as string;
  const cleanHtml = DOMPurify.sanitize(htmlFromMarkdown);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: cleanHtml,
      }}
    />
  );
};

export default MarkdownContainer;
