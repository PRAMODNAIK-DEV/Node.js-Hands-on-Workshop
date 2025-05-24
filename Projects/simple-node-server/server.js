const http = require('http');

const server = http.createServer((req, res) => {
  const { url } = req;

  // Set content type header
  res.setHeader('Content-Type', 'text/plain');

  if (url === '/') {
    res.statusCode = 200;
    res.end('Hello, World!');
  } else if (url === '/about') {
    res.statusCode = 200;
    res.end('This is the About page.');
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

// Server listens on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});