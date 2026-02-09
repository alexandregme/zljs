/**
 * Extracts the first code block from an AI response.
 * Supports ```html, ```tsx, ```jsx, or bare ``` fences.
 */
export function extractCode(response: string): string | null {
  const codeBlockRegex = /```(?:html|tsx|jsx)?\s*\n([\s\S]*?)```/;
  const match = response.match(codeBlockRegex);

  if (match?.[1]) {
    return match[1].trim();
  }

  return null;
}

/**
 * Strips code fences from a response, returning only the explanation text.
 */
export function extractExplanation(response: string): string {
  return response.replace(/```(?:html|tsx|jsx)?\s*\n[\s\S]*?```/g, "").trim();
}
