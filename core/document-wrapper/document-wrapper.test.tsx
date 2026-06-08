import { renderToStaticMarkup } from "react-dom/server";
import { DocumentWrapper } from "./document-wrapper";

describe("<DocumentWrapper />", () => {
  it("renders html with default lang pt-BR", () => {
    const html = renderToStaticMarkup(
      <DocumentWrapper>
        <p>Content</p>
      </DocumentWrapper>,
    );

    expect(html).toContain('<html lang="pt-BR">');
  });

  it("renders html with custom lang", () => {
    const html = renderToStaticMarkup(
      <DocumentWrapper lang="en">
        <p>Content</p>
      </DocumentWrapper>,
    );

    expect(html).toContain('<html lang="en">');
  });

  it("applies className to body", () => {
    const html = renderToStaticMarkup(
      <DocumentWrapper className="dark bg-black">
        <p>Content</p>
      </DocumentWrapper>,
    );

    expect(html).toContain('<body class="dark bg-black">');
  });

  it("renders children inside body", () => {
    const html = renderToStaticMarkup(
      <DocumentWrapper>
        <p>Hello World</p>
      </DocumentWrapper>,
    );

    expect(html).toContain("<body><p>Hello World</p></body>");
  });

  it("renders without className when not provided", () => {
    const html = renderToStaticMarkup(
      <DocumentWrapper>
        <p>Content</p>
      </DocumentWrapper>,
    );

    expect(html).toContain("<body><p>Content</p></body>");
  });
});
