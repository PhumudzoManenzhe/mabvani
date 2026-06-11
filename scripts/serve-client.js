const fs = require("fs");
const http = require("http");
const path = require("path");

const clientRoot = path.resolve(__dirname, "..", "client");
const port = Number(process.env.CLIENT_PORT || 5500);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const resolveRequestPath = (requestUrl) => {
  const parsedUrl = new URL(requestUrl, `http://localhost:${port}`);
  const requestedPath = decodeURIComponent(parsedUrl.pathname);
  const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
  const fullPath = path.resolve(clientRoot, relativePath);

  if (!fullPath.startsWith(clientRoot)) {
    return null;
  }

  return fullPath;
};

const server = http.createServer((request, response) => {
  const fullPath = resolveRequestPath(request.url);

  if (!fullPath || !fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ success: false, message: "Static file not found." }));
    return;
  }

  const extension = path.extname(fullPath);
  response.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream",
  });
  fs.createReadStream(fullPath).pipe(response);
});

server.listen(port, () => {
  const address = server.address();
  const boundPort = typeof address === "object" && address ? address.port : port;

  console.log(`UniApply SA frontend available at http://localhost:${boundPort}`);
});

module.exports = server;
