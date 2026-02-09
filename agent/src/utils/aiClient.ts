import type { Message } from "../hooks/useAgent";

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Streams a chat completion from the Anthropic API through the /api/chat proxy.
 * Parses SSE events and calls onChunk for each text delta.
 */
export async function streamChat(
  systemPrompt: string,
  messages: Message[],
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const anthropicMessages: AnthropicMessage[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: anthropicMessages,
      stream: true,
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;

      const data = line.slice(6);
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data) as Record<string, unknown>;
        if (parsed.type === "content_block_delta") {
          const delta = parsed.delta as Record<string, unknown> | undefined;
          if (delta?.type === "text_delta" && typeof delta.text === "string") {
            onChunk(delta.text);
          }
        }
      } catch {
        // Skip malformed SSE lines
      }
    }
  }
}
