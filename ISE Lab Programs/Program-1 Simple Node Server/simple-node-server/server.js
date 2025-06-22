const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');      // Indicates the type of data sent to Client

  if (req.url === '/') {
    res.statusCode = 200;                           // Status Code OK
    res.end('Hello, World!');                       // End the Response with Hello, Node.js Server!
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.end('This is the About page.');
  } else {
    res.statusCode = 404;                           // Status Code Not Found!
    res.end('Page not found');
  }
});

server.listen(port, hostname, () => {             // START the server.
  console.log(`Server running at http://${hostname}:${port}/`);
});