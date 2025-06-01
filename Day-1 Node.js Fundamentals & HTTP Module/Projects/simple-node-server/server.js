const http = require('http');
const fs = require('fs');
const PORT = 3000;
const DATA_FILE = './products.json';

// Helper to read products
const readProducts = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

// Helper to write products
const writeProducts = (products) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// Parse request body
const getRequestBody = (req) => new Promise(resolve => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => resolve(JSON.parse(body)));
});

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'application/json');

  // GET all products
  if (url === '/products' && method === 'GET') {
    const products = readProducts();
    res.end(JSON.stringify(products));
  }

  // POST new product
  else if (url === '/products' && method === 'POST') {
    const body = await getRequestBody(req);
    const products = readProducts();
    const newProduct = { id: Date.now().toString(), ...body };
    products.push(newProduct);
    writeProducts(products);
    res.statusCode = 201;
    res.end(JSON.stringify(newProduct));
  }

  // DELETE product by ID: /delete?id=123
  else if (method === 'DELETE' && url.startsWith('/products/')) {
    const id = url.split('/')[2]; // Extract the product ID from the URL

    let products = readProducts();
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
      const deleted = products.splice(index, 1);
      writeProducts(products);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Product deleted', product: deleted[0] }));
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Product not found' }));
    }
  }

  // Unknown route
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
