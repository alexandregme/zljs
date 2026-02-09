import { useState } from "react";
import { Header } from "./components/Header";
import { ChatPanel } from "./components/ChatPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { useAgent } from "./hooks/useAgent";

export const App = () => {
  const agent = useAgent();
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <ChatPanel
          messages={agent.messages}
          isStreaming={agent.isStreaming}
          onSend={agent.sendMessage}
        />
        <PreviewPanel
          code={agent.generatedCode}
          showCode={showCode}
          onToggleCode={() => setShowCode(!showCode)}
        />
      </main>
    </div>
  );
};
