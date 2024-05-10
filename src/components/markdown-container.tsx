/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export interface MarkdownContainerProps {
  markdown: string;
}

/**
 * Markdown container renders markdown text.
 *
 * @param props.markdown
 */
const MarkdownContainer: React.FC<MarkdownContainerProps> = ({ markdown }) => {
  const htmlFromMarkdown = marked.parse(markdown) as string;
  // Remove malformed HMTL
  const cleanHtml = DOMPurify.sanitize(htmlFromMarkdown);

  return (
    /*
    Note: Do NOT use this code in production if your LLM prompt might contain input data
    from more than one user at any time.

    Even though DOMPurify removes some XSS attack vectors, 
    fixing [data exfiltration risks](https://embracethered.com/blog/)
    is outside the scope of this demo.

    If not sure, only display LLM outputs as text; get your code audited by an expert;
    and never output unfiltered LLM output as runnable code, HTML, markdown, or URL attributes.
    */
    <div
      dangerouslySetInnerHTML={{
        __html: cleanHtml,
      }}
    />
  );
};

export default MarkdownContainer;
