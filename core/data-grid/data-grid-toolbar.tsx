import { Button } from "../button";
import { Input } from "../forms";

export interface DataGridToolbarProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export const DataGridToolbar = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  onClear,
}: DataGridToolbarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div
      className="flex items-center gap-2 mb-3"
      data-testid="data-grid-toolbar"
    >
      <Input
        aria-label="Buscar na tabela"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button icon="Search" color="primary" onClick={onSearch}>
        Buscar
      </Button>
      <Button icon="X" color="danger" onClick={onClear}>
        Limpar
      </Button>
    </div>
  );
};
