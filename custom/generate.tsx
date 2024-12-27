import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import React from "react";
import App from "./src/App";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type User = {
  id: string;
  name: string;
};

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "Jane Doe",
  },
];

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const generateHtmlFiles = async (urls: string[]) => {
  const outputDir = path.join(__dirname, "dist/client/html");
  ensureDir(outputDir);

  for (const url of urls) {
    const html = renderToString(
      <StaticRouter location={url}>
        <App users={users} />
      </StaticRouter>
    );

    const fileName = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(
      filePath,
      `<!DOCTYPE html>
<html>
  <head>
    <title>React SSR</title>
  </head>
  <body>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify({ users })}
    </script>
    <div id="app">${html}</div>
    <script src="/client.js"></script>
  </body>
</html>`
    );
    console.log(`Generated: ${filePath}`);
  }
};

generateHtmlFiles(["/", "/users"]);
