const db = require('../db');

// Criar a tabela se não existir
async function createTableIfNotExists() {
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false
    );
  `;
  await db.query(sql);
}

// Executa ao carregar o módulo
createTableIfNotExists()
  .then(() => console.log('✅ Tabela "tasks" verificada/criada.'))
  .catch((err) => console.error('❌ Erro ao criar tabela "tasks":', err));

// Buscar todas as tasks
async function getAllTasks() {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows;
}

// Criar nova task
async function createTask(title) {
  const [result] = await db.query('INSERT INTO tasks (title) VALUES (?)', [title]);
  return { id: result.insertId, title, completed: false };
}

// Marcar como concluída
async function completeTask(id) {
  await db.query('UPDATE tasks SET completed = true WHERE id = ?', [id]);
}

// Deletar task
async function deleteTask(id) {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
}

module.exports = {
  getAllTasks,
  createTask,
  completeTask,
  deleteTask
};
