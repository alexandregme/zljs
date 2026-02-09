import { useState } from "react";

interface CodeViewProps {
  code: string;
}

export const CodeView = ({ code }: CodeViewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-full overflow-auto bg-[#0d1117]">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy Code"}
      </button>
      <pre className="p-4 pt-12 text-sm text-emerald-400 font-mono leading-relaxed whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
};
