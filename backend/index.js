const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connessione al database
const db = new Database('todos.db');
console.log('Connected to the todos database.');

// Creo la tabella todos se non esiste
db.exec(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0
)`);

// Prepared statements
const stmts = {
  getAll: db.prepare('SELECT * FROM todos'),
  insert: db.prepare('INSERT INTO todos (text) VALUES (?)'),
  updateText: db.prepare('UPDATE todos SET text = ? WHERE id = ?'),
  updateCompleted: db.prepare('UPDATE todos SET completed = ? WHERE id = ?'),
  delete: db.prepare('DELETE FROM todos WHERE id = ?'),
};

// GET /todos - Recupera tutti i todos
app.get('/todos', (req, res) => {
  try {
    const rows = stmts.getAll.all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /todos - Crea un nuovo todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const result = stmts.insert.run(text);
    res.status(201).json({ id: result.lastInsertRowid, text, completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /todos/:id - Aggiorna un todo
app.put('/todos/:id', (req, res) => {
  const { completed, text } = req.body;
  const { id } = req.params;

  try {
    if (text !== undefined) {
      stmts.updateText.run(text, id);
      res.json({ id, text });
    } else if (completed !== undefined) {
      stmts.updateCompleted.run(completed, id);
      res.json({ id, completed });
    } else {
      res.status(400).json({ error: 'No valid fields to update' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id - Elimina un todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  try {
    stmts.delete.run(id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = app.listen(port, (error) => {
  if (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${port}`);
});

const shutdown = () => {
  server.close(() => {
    db.close();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);