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

import { marked } from "marked";
import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export interface PromptData {
  injectedContext?: string;
}

export interface FirestoreMessageData {
  prompt: string;
  response?: string;

  /** Document creation time. */
  createTime?: Timestamp;

  status?: {
    state: "COMPLETED" | "PROCESSING" | "ERROR";
    /** Generation start time. */
    startTime: Timestamp;
    /** Generation completion time. */
    completeTime?: Timestamp;
    /** Last status change time (populated on each status change, including errors). */
    updateTime: Timestamp;
    error?: string;
  };
}

export interface MessageData
  extends FirestoreMessageData,
    PromptData,
    ResponseData {
  id?: string;
}

export const ResponseData = z.object({
  followUpPrompts: z.string().array().optional(),
});

export type ResponseData = z.infer<typeof ResponseData>;

/**
 * Converts the (data transfer obejct) FirestoreMessageData to the (view model) ExpandedMessageData.
 *
 * 1. Extracts injected context from data.prompt
 * 2. Extracts structured data (JSON) from data.response
 */
export const prepareMessage = (data: FirestoreMessageData): MessageData => {
  const processedData: MessageData = { ...data };
  const [injectedContext, userPrompt] = data.prompt.split("\n---\n", 2);
  if (userPrompt) {
    processedData.prompt = userPrompt;
    processedData.injectedContext = injectedContext;
  }
  if (data.response) {
    let jsonText = "{}";
    try {
      marked.use({
        renderer: {
          code: (code: string) => {
            jsonText = code;
            return "";
          },
        },
      });
      marked(data.response);

      // Prepare view model for the generated response.
      // It is important to validate correctness of LLM generated code to prevent runtime errors.
      const parsedResponse = z
        .string()
        .transform<ResponseData>((t) => JSON.parse(t))
        .pipe(ResponseData)
        .parse(jsonText);
      console.log("Extracted JSON from response:", parsedResponse);
      processedData.followUpPrompts = parsedResponse.followUpPrompts;
    } catch (e) {
      console.warn("Error parsing response as JSON: ", e, jsonText);
    }
  }
  return processedData;
};
