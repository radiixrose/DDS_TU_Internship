const http = require("http");
const HOST = "127.0.0.1";
const PORT = +process.argv[2] || 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, message: "Hello world!" }));
});

server
  .listen(PORT, HOST)
  .on("error", (err) => {
    console.error(`Something went wrong:  ${err}`);
  })
  .on("listening", () => {
    console.log(`"Hello World" Node Server running at http://${HOST}:${PORT}`);
  });
