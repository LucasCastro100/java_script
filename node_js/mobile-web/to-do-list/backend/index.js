// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // usa mysql2/promise agora
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  try {
    const [result] = await db.query('INSERT INTO tasks (title) VALUES (?)', [title]);
    res.status(201).json({ id: result.insertId, title, completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update task status
app.put('/tasks/:id', async (req, res) => {
  const { completed } = req.body;
  try {
    await db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, req.params.id]);
    res.json({ message: 'Atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
