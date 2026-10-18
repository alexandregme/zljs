import mockAxios from "axios";
import { HTTPClient } from "./http.client";
import { useAppStore } from "../state/app";
import { useToastStore } from "../state/toast";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: "mock GET response" })),
    post: vi.fn(() => Promise.resolve({ data: "mock POST response" })),
    put: vi.fn(() => Promise.resolve({ data: "mock PUT response" })),
    delete: vi.fn(() => Promise.resolve({ data: "mock DELETE response" })),
    patch: vi.fn(() => Promise.resolve({ data: "mock PATCH response" })),
  },
}));

const resetStores = () => {
  useAppStore.setState({ fetchingCalls: 0, fetching: false });
  useToastStore.setState({ toasts: [] });
};

let client: HTTPClient;

describe("HTTPClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetStores();
    client = new HTTPClient();
  });

  describe("config", () => {
    it("uses /api as default baseUrl", () => {
      expect(client.baseUrl).toBe("/api");
    });

    it("accepts custom baseUrl", () => {
      const custom = new HTTPClient({ baseUrl: "http://localhost:3001" });

      expect(custom.baseUrl).toBe("http://localhost:3001");
    });

    it("accepts custom headers", () => {
      const custom = new HTTPClient({
        headers: { Authorization: "Bearer token" },
      });

      expect(custom.headers).toEqual({ Authorization: "Bearer token" });
    });
  });

  describe("GET", () => {
    it("calls axios.get with url and params", async () => {
      await client.get("/users", { params: { page: 1 } });

      expect(mockAxios.get).toHaveBeenCalledWith("/api/users", {
        headers: {},
        params: { page: 1 },
      });
    });

    it("returns data from response", async () => {
      const result = await client.get("/users");

      expect(result).toBe("mock GET response");
    });
  });

  describe("POST", () => {
    it("calls axios.post with url and payload", async () => {
      await client.post("/users", { payload: { name: "John" } });

      expect(mockAxios.post).toHaveBeenCalledWith(
        "/api/users",
        { name: "John" },
        { headers: {} },
      );
    });

    it("sends FormData directly", async () => {
      const formData = new FormData();
      formData.append("file", "content");

      await client.post("/upload", { payload: formData });

      expect(mockAxios.post).toHaveBeenCalledWith("/api/upload", formData, {
        headers: {},
      });
    });

    it("returns data from response", async () => {
      const result = await client.post("/users");

      expect(result).toBe("mock POST response");
    });
  });

  describe("PUT", () => {
    it("calls axios.put with url and payload", async () => {
      await client.put("/users/1", { payload: { name: "Jane" } });

      expect(mockAxios.put).toHaveBeenCalledWith(
        "/api/users/1",
        { name: "Jane" },
        { headers: {} },
      );
    });

    it("returns data from response", async () => {
      const result = await client.put("/users/1");

      expect(result).toBe("mock PUT response");
    });
  });

  describe("DELETE", () => {
    it("calls axios.delete with url and payload", async () => {
      await client.delete("/users/1", { payload: { reason: "test" } });

      expect(mockAxios.delete).toHaveBeenCalledWith("/api/users/1", {
        headers: {},
        data: { reason: "test" },
      });
    });

    it("returns data from response", async () => {
      const result = await client.delete("/users/1");

      expect(result).toBe("mock DELETE response");
    });
  });

  describe("PATCH", () => {
    it("calls axios.patch with url and payload", async () => {
      await client.patch("/users/1", { payload: { name: "updated" } });

      expect(mockAxios.patch).toHaveBeenCalledWith(
        "/api/users/1",
        { name: "updated" },
        { headers: {} },
      );
    });

    it("returns data from response", async () => {
      const result = await client.patch("/users/1");

      expect(result).toBe("mock PATCH response");
    });
  });

  describe("fetching state", () => {
    it("calls startFetching before request", async () => {
      const spy = vi.spyOn(useAppStore.getState(), "startFetching");

      await client.get("/users");

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("calls finishFetching after successful request", async () => {
      const spy = vi.spyOn(useAppStore.getState(), "finishFetching");

      await client.get("/users");

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("calls finishFetching after failed request", async () => {
      vi.mocked(mockAxios.get).mockRejectedValueOnce(new Error("fail"));
      const spy = vi.spyOn(useAppStore.getState(), "finishFetching");

      await client.get("/users");

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("error handling", () => {
    it("sends error toast on failure", async () => {
      vi.mocked(mockAxios.get).mockRejectedValueOnce(
        new Error("Network Error"),
      );

      await client.get("/users");

      const toasts = useToastStore.getState().toasts;
      expect(toasts).toHaveLength(1);
      expect(toasts[0]?.type).toBe("error");
      expect(toasts[0]?.message).toContain("Network Error");
    });

    it("returns undefined on error", async () => {
      vi.mocked(mockAxios.get).mockRejectedValueOnce(new Error("fail"));

      const result = await client.get("/users");

      expect(result).toBeUndefined();
    });
  });

  describe("silent mode", () => {
    it("does not call startFetching when silent", async () => {
      const spy = vi.spyOn(useAppStore.getState(), "startFetching");

      await client.get("/users", { silent: true });

      expect(spy).not.toHaveBeenCalled();
    });

    it("does not call finishFetching when silent", async () => {
      const spy = vi.spyOn(useAppStore.getState(), "finishFetching");

      await client.get("/users", { silent: true });

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
