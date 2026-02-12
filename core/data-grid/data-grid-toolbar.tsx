import { useState } from "react";
import { GridApi } from "ag-grid-community";
import { Button } from "../button";
import { Input } from "../forms";

export interface DataGridToolbarProps {
  gridApi: GridApi | null;
}

export const DataGridToolbar = ({ gridApi }: DataGridToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    gridApi?.setGridOption("quickFilterText", searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    gridApi?.setGridOption("quickFilterText", "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
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
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button icon="Search" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
      <Button icon="X" color="danger" onClick={handleClear}>
        Limpar
      </Button>
    </div>
  );
};
