/**
 * Wraps generated HTML code in a complete HTML document
 * with the Tailwind CSS CDN for iframe rendering.
 */
export function buildPreviewHtml(code: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body>
  ${code}
</body>
</html>`;
}
