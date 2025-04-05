const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.listen(3001, () => {
  console.log('✅ Servidor rodando em http://localhost:3001');
});
