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
  const { name, description, price } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const newItem = { id: idCounter++, name, description, price };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item by ID
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const item = items.find(i => i.id === parseInt(id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (!description) return res.status(400).json({ error: 'description is required' });
  if (!price) return res.status(400).json({ error: 'price is required' });
  item.name = name;
  item.description = description;
  item.price = price;
  res.json(item);
});

// DELETE item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  items.splice(index, 1);
  res.status(200).send({ "status": "ok", "message": `Item ${id} deleted successfully!` });
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
  <title>Product Manager</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 30px;
    }
    input, button {
      margin: 5px 0;
      display: block;
    }
    ul {
      padding-left: 0;
    }
    li {
      list-style: none;
      margin-bottom: 15px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
    button {
      margin-right: 5px;
    }
  </style>
</head>
<body>
  <h1>Item Manager</h1>

  <form id="addForm">
    <input type="text" id="itemName" placeholder="Item name" required>
    <input type="text" id="itemDescription" placeholder="Description" required>
    <input type="number" id="itemPrice" placeholder="Price" required step="0.01" min="0">
    <button type="submit">Add Item</button>
  </form>

  <ul id="itemList"></ul>

  <script defer>
    const api = 'http://localhost:3000/items';

    const list = document.getElementById('itemList');
    const form = document.getElementById('addForm');
    const itemName = document.getElementById('itemName');
    const itemDescription = document.getElementById('itemDescription');
    const itemPrice = document.getElementById('itemPrice');

    async function fetchItems() {
      try {
        const res = await fetch(api);
        const items = await res.json();
        list.innerHTML = '';
        items.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${item.name}</strong><br>
            Description: ${item.description}<br>
            Price: ₹${parseFloat(item.price).toFixed(2)}<br>
            <button onclick="deleteItem(${item.id})">Delete</button>
            <button onclick="editItem(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}', ${item.price})">Edit</button>
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
          body: JSON.stringify({
            name: itemName.value.trim(),
            description: itemDescription.value.trim(),
            price: parseFloat(itemPrice.value)
          })
        });
        itemName.value = '';
        itemDescription.value = '';
        itemPrice.value = '';
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

    async function editItem(id, oldName, oldDescription, oldPrice) {
      const newName = prompt('Edit item name:', oldName);
      const newDescription = prompt('Edit item description:', oldDescription);
      const newPrice = prompt('Edit item price:', oldPrice);

      if (newName && newDescription && newPrice && !isNaN(parseFloat(newPrice))) {
        try {
          await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: newName.trim(),
              description: newDescription.trim(),
              price: parseFloat(newPrice)
            })
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

| Test Case ID | Method | Endpoint   | Input Data                                                                                                                                 | Expected Output             | Status Code |
|--------------|--------|------------|--------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|-------------|
| TC-01        | GET    | /items     | None                                                                                                                                       | List of all items           | 200         |
| TC-02        | POST   | /items     | `{ "name": "Item Name", "description": "Item Description", "price": 100 }`                                                                | Newly created item          | 201         |
| TC-03        | PUT    | /items/1   | `{ "name": "Updated Item Name", "description": "Updated Item Description", "price": 150 }`                                                | Updated item                | 200         |
| TC-04        | DELETE | /items/1   | None                                                                                                                                       | Success message             | 200         |
| TC-05        | POST   | /items     | `{}`                                                                                                                                       | `{ "error": "Name is required" }` | 400         |
| TC-06        | PUT    | /items/999 | `{ "name": "X", "description": "Y", "price": 50 }`                                                                                         | `{ "error": "Item not found" }` | 404         |
---

## Note
This project demonstrates how to create a RESTful API with full CRUD operations using Express.js and connect it with a frontend using HTML and vanilla JavaScript.

---

## Test API Endpoints in Postman
To understand how to use Postman for API Testing Please refere this document: [How to Use Postman](../../Postman.md)

### 1. Get all items

**Request**
```
GET /items
```

**Example in Postman:**
- Method: `GET`
- URL: `http://localhost:3000/items`
- Body: No body needed as it is GET

**Response**
```json
[]
```
Initially we will get [] empty array as we have not added any items yet.
---

### 2. Add a new item

**Request**
```
POST /items
```

**Example in Postman:**
- Method: `POST`
- URL: `http://localhost:3000/items`
- Body (select `raw` + `JSON`): and paste the below JSON
```json
{
  "name": "Pen",
  "description": "Blue ink pen",
  "price": 10
}
```

**Response**
```json
{
  "id": 1,
  "name": "Pen",
  "description": "Blue ink pen",
  "price": 10
}
```

To test whether the Product Pen is Posted/Added or not use The 1st endpoint GET /item. THis time you should get one item as a response not []

For example In Postman make the following changes:

- Method: `GET`
- URL: `http://localhost:3000/items`
- Body: No body needed as it is GET

**Response**
```json
[
    {
        "id": 1,
        "name": "Pen",
        "description": "Blue ink pen",
        "price": 10
    }
]
```

This is the product which you added in the previous POST /items endpoint.
---

### 3. Update an item
Now imagin by miss you gave wrong product name in the prevous POST /items. So in order to change the name or any other details of previously created product you have to use PUT /items
**Request**
```
PUT /items/:id
```

**Example in Postman:**
- Method: `PUT`
- URL: `http://localhost:3000/items/1`        -->  Do not forget to add query parameter /1 the product id you want to update after /items otherwise you will get 404 Not Found.
- Body:
```json
{
  "name": "Black Rock Pen",
  "description": "Black ink pen",
  "price": 12
}
```

**Response**
```json
{
    "id": 1,
    "name": "Black Rock Pen",
    "description": "Black ink pen",
    "price": 12
}
```
---
### 4. Delete an item
Now imagin the production of the `Black Rock Pen` is stopped so we have to delete that product.
**Request**
```
DELETE /items/:id
```

**Example in Postman:**
- Method: `DELETE`
- URL: `http://localhost:3000/items/1`

**Response**
```json
{
  "status": "ok",
  "message": "Item 1 deleted successfully!"
}
```

---