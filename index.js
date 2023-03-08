const fs = require("fs/promises");
const http = require("http");

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  const url = new URL(req.url, "http://localhost:8080/");
  try {
    const data = await getHtml(url);
    res.setHeader("content-type", "text/html");
    res.end(data);
  } catch (err) {
    console.error(err);
    res.setHeader("content-type", "text/html");
    res.end(err);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getPath(url) {
  if (url.pathname === "/") return "./index.html";
  else return "." + url.pathname + ".html";
}

async function getHtml(url) {
  const path = getPath(url);
  try {
    const data = await fs.readFile(path, { encoding: "utf8" });
    return data;
  } catch (err) {
    const errpath = "./error.html";
    try {
      const data = await fs.readFile(errpath, { encoding: "utf8" });
      return data;
    } catch (err) {
      return "An error occurred while processing your request.";
    }
  }
}
