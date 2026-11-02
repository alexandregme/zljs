import { splitURLasPath } from "./router.utils";

describe("splitURLasPath", () => {
  it("returns no parameters for a path alone", () => {
    expect(splitURLasPath("/orders")).toEqual({});
  });

  it("returns no parameters for a query with nothing in it", () => {
    expect(splitURLasPath("/orders?")).toEqual({});
  });

  it("returns no parameters when the URL is missing", () => {
    expect(splitURLasPath(undefined as unknown as string)).toEqual({});
  });

  it("reads the query", () => {
    expect(splitURLasPath("/orders?id=7&open=true")).toEqual({
      id: "7",
      open: "true",
    });
  });

  it("doesn't read parameters from the hash", () => {
    expect(splitURLasPath("http://x.com#abs=1&x=3")).toEqual({});
  });

  it("leaves the hash out of the query", () => {
    expect(splitURLasPath("/orders?id=7#id=8&top")).toEqual({ id: "7" });
  });

  it("gives a parameter with no value an empty string", () => {
    expect(splitURLasPath("/orders?flag")).toEqual({ flag: "" });
  });

  it("skips a parameter with no name", () => {
    expect(splitURLasPath("/orders?=x&&id=7")).toEqual({ id: "7" });
  });
});
