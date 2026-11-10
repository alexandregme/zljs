import { render } from "@testing-library/react";
import { MOCK_AUTH_SESSION, MockAuthProvider } from "@test-utils";
import { getAuthSession } from "@zljs/core";

describe("getAuthSession", () => {
  it("returns null with no session", () => {
    render(<MockAuthProvider>{null}</MockAuthProvider>);

    expect(getAuthSession()).toBeNull();
  });

  it("returns the session of <AuthProvider />", () => {
    render(
      <MockAuthProvider session={MOCK_AUTH_SESSION}>{null}</MockAuthProvider>,
    );

    expect(getAuthSession()).toEqual(MOCK_AUTH_SESSION);
  });
});
