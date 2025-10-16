const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
let nextId = 3;

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  
  const user = { id: nextId++, name, email };
  users.push(user);
  console.log('Created  user:', user);
  console.log("dddddd")
  res.status(201).json(user);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  
  users[userIndex] = { id, name, email };
  console.log('Updated user:', users[userIndex]);
  res.json(users[userIndex]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  users.splice(userIndex, 1);
  console.log('Deleted user with ID:', id);
  console.log('Current usersddd:', users);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running ons http://localhost:${PORT}`);
});