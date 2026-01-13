import { Button } from "@zljs/core";
import { FormProvider, FormInput } from "@zljs/rhf";
import type { SearchFormData } from "./search-form.interface";

export const SearchForm = () => {
  const handleSubmit = (data: SearchFormData) => {
    alert(`Searching for: ${data.search}`);
  };

  return (
    <FormProvider onSubmit={handleSubmit} defaultValues={{ search: "" }}>
      <div className="flex gap-2 items-end max-w-md">
        <FormInput
          name="search"
          label="Search"
          placeholder="Enter search term..."
        />
        <Button type="submit">Search</Button>
      </div>
    </FormProvider>
  );
};
