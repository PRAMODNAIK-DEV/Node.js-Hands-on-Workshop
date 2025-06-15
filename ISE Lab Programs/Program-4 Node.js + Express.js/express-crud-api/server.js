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