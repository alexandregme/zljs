export interface RouterState {
  urlAsPath: string;
  query: Record<string, string>;
  setRoute: (urlAsPath: string) => void;
}
