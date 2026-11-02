export interface AppState {
  fetchingCalls: number;
  fetching: boolean;
  startFetching: () => void;
  finishFetching: () => void;
}
