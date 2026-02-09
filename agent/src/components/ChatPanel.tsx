import { useState, useRef, useEffect } from "react";
import type { Message } from "../hooks/useAgent";

const SUGGESTED_PROMPTS = [
  "Create a login page with email and password",
  "Build a dashboard with sidebar and data table",
  "Design a settings page with profile form",
];

interface ChatPanelProps {
  messages: Message[];
  isStreaming: boolean;
  onSend: (message: string) => void;
}

export const ChatPanel = ({
  messages,
  isStreaming,
  onSend,
}: ChatPanelProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSend(input.trim());
    setInput("");
  };

  const handleSuggestedPrompt = (prompt: string) => {
    if (isStreaming) return;
    onSend(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <aside className="flex flex-col w-[420px] min-w-[320px] border-r border-gray-200 bg-[#0F172A]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-4 pt-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-1">
                What do you want to build?
              </h2>
              <p className="text-sm text-slate-400">
                Describe a UI and I'll generate it for you.
              </p>
            </div>
            <div className="space-y-2 pt-4">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="w-full text-left px-4 py-3 text-sm text-slate-300 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-3 rounded-lg text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-8"
                : "bg-slate-800 text-slate-200 mr-4"
            }`}
          >
            <div className="whitespace-pre-wrap">{msg.displayContent}</div>
          </div>
        ))}

        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="px-4 py-3 bg-slate-800 rounded-lg mr-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Generating...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-slate-700/50"
      >
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the UI you want..."
            disabled={isStreaming}
            rows={2}
            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="self-end px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Send
          </button>
        </div>
      </form>
    </aside>
  );
};
