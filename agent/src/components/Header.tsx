export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 h-12 bg-[#1B2A4A] shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-white tracking-tight">
          zljs
        </span>
        <span className="text-sm font-medium text-blue-300">Agent</span>
      </div>
      <span className="text-xs text-slate-400">Powered by zljs Framework</span>
    </header>
  );
};
