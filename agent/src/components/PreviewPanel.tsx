import { CodeView } from "./CodeView";
import { buildPreviewHtml } from "../utils/componentRenderer";

interface PreviewPanelProps {
  code: string;
  showCode: boolean;
  onToggleCode: () => void;
}

export const PreviewPanel = ({
  code,
  showCode,
  onToggleCode,
}: PreviewPanelProps) => {
  const srcdoc = code ? buildPreviewHtml(code) : "";

  return (
    <section className="flex flex-col flex-1 bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 h-10 border-b border-gray-200 shrink-0">
        <button
          onClick={() => showCode && onToggleCode()}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            !showCode
              ? "bg-gray-900 text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => !showCode && onToggleCode()}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            showCode
              ? "bg-gray-900 text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Code
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!code ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">
              Describe a UI to see the preview here
            </span>
          </div>
        ) : showCode ? (
          <CodeView code={code} />
        ) : (
          <iframe
            srcDoc={srcdoc}
            title="Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts"
          />
        )}
      </div>
    </section>
  );
};
