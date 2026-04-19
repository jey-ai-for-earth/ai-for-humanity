const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  let requestPath = decodeURIComponent(requestUrl.pathname);

  if (requestPath === "/") {
    requestPath = "/index.html";
  }

  const filePath = path.join(root, requestPath);
  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  let resolvedPath = filePath;
  try {
    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory()) {
      resolvedPath = path.join(resolvedPath, "index.html");
    }
  } catch {
    // Keep the original path; the 404 branch below will handle it.
  }

  if (!fs.existsSync(resolvedPath)) {
    send(res, 404, "404 Not Found");
    return;
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";
  const body = fs.readFileSync(resolvedPath);
  res.writeHead(200, { "Content-Type": contentType });
  res.end(body);
});

server.listen(port, () => {
  console.log(`Serving AI for Earth at http://127.0.0.1:${port}/`);
});
