import type { ZustandProvidersProps } from "../../../features/providers";
import type { ReduxProviderProps } from "../../state/redux";

export type AppProvidersProps = ReduxProviderProps &
  Pick<ZustandProvidersProps, "auth">;
