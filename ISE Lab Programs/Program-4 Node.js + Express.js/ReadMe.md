# Node.js + Express.js CRUD API with HTML Frontend

## Problem Statement
Create a REST API using Express.js for managing items with full CRUD support:

1. `GET /items` - Return all items

2. `POST /items` - Add a new item

3. `PUT /items/:id` - Update an item by ID

4. `DELETE /items/:id` - Delete an item by ID

Also, build a simple HTML frontend to:

- View a list of items

- Add a new item

- Update an existing item

- Delete an item

---

## Functional Requirements
1. Use Express.js for backend routing

2. API should send/receive data in JSON

3. POST and PUT must validate the request body

4. Frontend must use JavaScript + Forms to interact with API

---
Note This server doesn't store data in file or any database it temporarily stores data in Variable specifically in let items = []; array. This will be erased when you refresh your application or server.
---

## Folder Structure
```
express-crud-api/
├── public/
│   └── index.html
├── server.js
└── README.md
```

---

## Step-by-Step Instructions

### 1. Initialize the Project
```bash
mkdir express-crud-api
cd express-crud-api
npm init -y
npm install express body-parser cors
```

### 2. Create `server.js`
```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let items = [];
let idCounter = 1;

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const newItem = { id: idCounter++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item by ID
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(i => i.id === parseInt(id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  if (!name) return res.status(400).json({ error: 'Name is required' });
  item.name = name;
  res.json(item);
});

// DELETE item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  items.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
```

### 3. Create `public/index.html`
Inside the project root folder `express-crud-api` create a new folder named public and inside of it creae a new fle named index.html and paste the below code.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Item Manager</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 30px;
    }
    input, button {
      margin: 5px 0;
    }
    ul {
      padding-left: 0;
    }
    li {
      list-style: none;
      margin-bottom: 10px;
    }
    button {
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <h1>Item Manager</h1>

  <form id="addForm">
    <input type="text" id="itemName" placeholder="Item name" required>
    <button type="submit">Add Item</button>
  </form>

  <ul id="itemList"></ul>

  <script defer>
    const api = 'http://localhost:3000/items';

    const list = document.getElementById('itemList');
    const form = document.getElementById('addForm');
    const itemName = document.getElementById('itemName');

    async function fetchItems() {
      try {
        const res = await fetch(api);
        const items = await res.json();
        list.innerHTML = '';
        items.forEach(item => {
          const li = document.createElement('li');
          const safeName = item.name.replace(/"/g, '&quot;'); // escape double quotes
          li.innerHTML = `
            ${item.name}
            <button onclick="deleteItem(${item.id})">Delete</button>
            <button onclick="editItem(${item.id}, '${safeName}')">Edit</button>
          `;
          list.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        await fetch(api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: itemName.value.trim() })
        });
        itemName.value = '';
        fetchItems();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    });

    async function deleteItem(id) {
      try {
        await fetch(`${api}/${id}`, { method: 'DELETE' });
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }

    async function editItem(id, oldName) {
      const newName = prompt('Edit item name:', oldName);
      if (newName && newName.trim()) {
        try {
          await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName.trim() })
          });
          fetchItems();
        } catch (error) {
          console.error('Error editing item:', error);
        }
      }
    }

    window.onload = fetchItems;
  </script>
</body>
</html>

```

---

## Test Cases

| Test Case ID | Method | Endpoint       | Input Data          | Expected Output         | Status Code |

|--------------|--------|----------------|----------------------|--------------------------|--------------|

| TC-01        | GET    | /items         | None                 | List of all items        | 200          |

| TC-02        | POST   | /items         | { name: "Test" }    | Newly created item       | 201          |

| TC-03        | PUT    | /items/1       | { name: "Updated" } | Updated item             | 200          |

| TC-04        | DELETE | /items/1       | None                 | No content               | 204          |

| TC-05        | POST   | /items         | { }                  | Error: name required     | 400          |

| TC-06        | PUT    | /items/999     | { name: "X" }       | Error: not found         | 404          |

---

## Note
This project demonstrates how to create a RESTful API with full CRUD operations using Express.js and connect it with a frontend using HTML and vanilla JavaScript.

---