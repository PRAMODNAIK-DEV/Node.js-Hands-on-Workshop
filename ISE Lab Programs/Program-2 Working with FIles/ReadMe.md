# Problem 2: Serving Static Files using Native Node.js (No Express)

## Problem Statement
Create a Node.js server that serves static files (HTML, CSS, JS) from the current directory. If a requested file does not exist, the server should return a 404 error.

## Folder Structure
```
project-folder/
├── index.html
├── style.css
├── script.js
└── server.js
```

## `server.js` (Using Native `http` and `fs` modules)
Create a server file named `server.js` and place the below code in it.

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? '/index.html' : req.url);
  let ext = path.extname(filePath);
  let contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

## Sample `index.html`
```html
<!DOCTYPE html>
<html>
<head>
  <title>Node Static Server</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello from index.html</h1>
  <script src="script.js"></script>
</body>
</html>
```

## Sample `style.css`
```css
body {
  background-color: #f0f0f0;
  font-family: sans-serif;
}
```

## Sample `script.js`
```js
console.log("Hello from script.js!");
```

## Test Case Coverage

| Test Case ID | Request Path | Expected Response      | Status Code | Notes                                    |
| ------------ | ------------ | ---------------------- | ----------- | ---------------------------------------- |
| TC-01        | /index.html  | Contents of index.html | 200         | Should return the HTML file content.     |
| TC-02        | /style.css   | Contents of style.css  | 200         | Should return the CSS file content.      |
| TC-03        | /script.js   | Contents of script.js  | 200         | Should return the JS file content.       |
| TC-04        | /nonexistent | "File not found"       | 404         | Should return 404 for non-existing file. |



## Test the Enpoint in the Browser:
As all are GET endpoints so no need to use Postman for testing we can directly test it in Browser.

### 1. http://localhost:3000/      
#### Response
Content of HTML File
```js
Hello from index.html
```

### 2. http://localhost:3000/index.html  
#### Response
Content of HTML File
```js
 Hello from index.html
```

### 3. http://localhost:3000/style.css
#### Response  
Content of CSS File
```js
body {
  background-color: #f0f0f0;
  font-family: sans-serif;
}
```
### 4. http://localhost:3000/script.js
#### Response  
Content of JavaScript File
```js
console.log("Hello from script.js!");
```
