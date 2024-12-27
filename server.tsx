import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import App from "./src/App";
import { renderToString } from "react-dom/server";
import React from "react";
import { StaticRouter } from "react-router-dom/server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from dist/client

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

app.get("/client.js", (req, res) => {
  const filePath = path.join(__dirname, "dist/client/client.js");
  const file = fs.readFileSync(filePath, "utf-8");
  res.send(file);
});

app.get("*", (req, res) => {
  const html = renderToString(
    <StaticRouter location={req.url}>
      <App users={users} />
    </StaticRouter>
  );

  // Read the template and inject our rendered app

  res.send(`
    <html>
      <body>
        <script>
          window.__INITIAL_STATE__ = JSON.parse('${JSON.stringify({ users })}')
        </script>
        <div id="app">${html}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3000");
});
