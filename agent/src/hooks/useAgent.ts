import { useState, useCallback, useRef } from "react";
import { streamChat } from "../utils/aiClient";
import { extractCode, extractExplanation } from "../utils/codeParser";

export interface Message {
  role: "user" | "assistant";
  content: string;
  displayContent: string;
}

interface AgentState {
  messages: Message[];
  generatedCode: string;
  isStreaming: boolean;
  sendMessage: (text: string) => void;
}

const SYSTEM_PROMPT = `You are an expert UI developer specializing in modern, production-quality interfaces.

When the user describes a UI, generate a complete, self-contained HTML snippet using Tailwind CSS utility classes.

Rules:
- Output a brief 1-2 sentence explanation of what you built, THEN the code in a \`\`\`html code fence
- Use ONLY HTML elements with Tailwind CSS classes — no React, no JSX, no JavaScript
- Do NOT include <html>, <head>, <body>, or <script> tags — just the UI markup
- Wrap everything in a single root <div>
- Make the design polished, modern, and professional
- Use realistic placeholder content (names, emails, numbers)
- Ensure responsive design using Tailwind breakpoints where appropriate
- Use a consistent color palette — prefer slate/gray tones with blue accents
- Add hover states and transitions for interactive elements
- Use proper semantic HTML (nav, main, section, article, form, etc.)
- For icons, use simple SVG or Unicode characters

Available Tailwind classes include all utilities from Tailwind CSS v3 (the CDN version).`;

export const useAgent = (): AgentState => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        role: "user",
        content: text,
        displayContent: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);

      const allMessages = [...messages, userMessage];
      let fullResponse = "";

      try {
        abortRef.current = new AbortController();

        await streamChat(
          SYSTEM_PROMPT,
          allMessages,
          (chunk: string) => {
            fullResponse += chunk;

            const explanation = extractExplanation(fullResponse);
            const displayText = explanation || "Generating code...";

            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return [
                  ...prev.slice(0, -1),
                  {
                    role: "assistant" as const,
                    content: fullResponse,
                    displayContent: displayText,
                  },
                ];
              }
              return [
                ...prev,
                {
                  role: "assistant" as const,
                  content: fullResponse,
                  displayContent: displayText,
                },
              ];
            });

            const code = extractCode(fullResponse);
            if (code) {
              setGeneratedCode(code);
            }
          },
          abortRef.current.signal,
        );

        // Final extraction after stream completes
        const code = extractCode(fullResponse);
        if (code) {
          setGeneratedCode(code);
        }

        const explanation = extractExplanation(fullResponse);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              {
                role: "assistant" as const,
                content: fullResponse,
                displayContent: explanation || "Here's the generated UI.",
              },
            ];
          }
          return prev;
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `Error: ${error.message}`,
              displayContent: `Something went wrong: ${error.message}`,
            },
          ]);
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages],
  );

  return { messages, generatedCode, isStreaming, sendMessage };
};
