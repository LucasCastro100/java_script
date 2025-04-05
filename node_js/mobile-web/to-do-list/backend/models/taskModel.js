const db = require('../config/db');

async function getAllTasks() {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows;
}

async function createTask(title) {
  const [result] = await db.query('INSERT INTO tasks (title) VALUES (?)', [title]);
  return { id: result.insertId, title, completed: false };
}

async function updateTask(id, completed) {
  await db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id]);
}

async function deleteTask(id) {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
