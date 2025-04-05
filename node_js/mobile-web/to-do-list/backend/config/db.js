// backend/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,         // host do seu banco (ex: localhost)
    user: process.env.DB_USER,         // usuário do banco (ex: root)
    password: process.env.DB_PASSWORD, // senha do banco
    database: process.env.DB_NAME,     // nome do banco (ex: todolist)

    // opções de performance:
    waitForConnections: true,          // espera se todas as conexões estiverem ocupadas
    connectionLimit: 10,               // máximo de conexões simultâneas no pool
    queueLimit: 0                      // sem limite de requisições na fila (0 = infinito)
});

// Testa a conexão assim que o pool for criado
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conectado ao MySQL com sucesso!');
        connection.release(); // devolve a conexão pro pool
    } catch (error) {
        console.error('❌ Erro ao conectar no MySQL:', error);
    }
}

testConnection();

module.exports = pool;