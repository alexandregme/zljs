import {
  createMockAuthAdapter,
  MOCK_APP_ID,
  MOCK_AUTH_SESSION,
} from "@test-utils";
import { useAuthStore } from "./auth.store";

const reset = () => useAuthStore.getState().reset();

describe("AuthStore", () => {
  beforeEach(() => reset());

  it("starts loading with no session", () => {
    const state = useAuthStore.getState();

    expect(state.status).toBe("loading");
    expect(state.session).toBeNull();
    expect(state.adapter).toBeNull();
    expect(state.appId).toBeNull();
  });

  it("keeps the adapter and the appId on configure", () => {
    const adapter = createMockAuthAdapter();

    useAuthStore.getState().configure(adapter, MOCK_APP_ID);

    expect(useAuthStore.getState().adapter).toBe(adapter);
    expect(useAuthStore.getState().appId).toBe(MOCK_APP_ID);
  });

  it("is authenticated on setSession with a session", () => {
    useAuthStore.getState().setSession(MOCK_AUTH_SESSION);

    expect(useAuthStore.getState().status).toBe("authenticated");
    expect(useAuthStore.getState().session).toEqual(MOCK_AUTH_SESSION);
  });

  it("is unauthenticated on setSession with null", () => {
    useAuthStore.getState().setSession(MOCK_AUTH_SESSION);
    useAuthStore.getState().setSession(null);

    expect(useAuthStore.getState().status).toBe("unauthenticated");
    expect(useAuthStore.getState().session).toBeNull();
  });

  it("goes back to loading with no session nor adapter on reset", () => {
    useAuthStore.getState().configure(createMockAuthAdapter(), MOCK_APP_ID);
    useAuthStore.getState().setSession(MOCK_AUTH_SESSION);
    useAuthStore.getState().reset();

    expect(useAuthStore.getState().status).toBe("loading");
    expect(useAuthStore.getState().session).toBeNull();
    expect(useAuthStore.getState().adapter).toBeNull();
    expect(useAuthStore.getState().appId).toBeNull();
  });
});
