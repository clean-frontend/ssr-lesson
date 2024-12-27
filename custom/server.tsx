import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from dist/client
app.use(express.static(path.join(__dirname, "dist/client")));

app.get("*", (req, res) => {
  const url = req.url === "/" ? "/index.html" : `${req.url}.html`;
  const htmlPath = path.join(__dirname, "dist/client/html", url);

  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, "utf-8");
    res.send(html);
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
