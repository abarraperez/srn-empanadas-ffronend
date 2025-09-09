const express = require('express');
const sequelize = require('./models');
const Empanada = require('./models/Empanada');
const app = express();
const port = 3000;

// Sincronizar modelos y conectar a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MariaDB con Sequelize');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados');
  })
  .catch(err => {
    console.error('Error al conectar con Sequelize:', err);
    process.exit(1);
  });

app.get('/', async (req, res) => {
  res.send('Backend Node.js con Sequelize funcionando!');
});

// Rutas para CRUD de empanadas
app.get('/api/empanadas', async (req, res) => {
  try {
    const empanadas = await Empanada.findAll();
    res.json(empanadas);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar empanadas' });
  }
});

app.post('/api/empanada', express.json(), async (req, res) => {
    try {
        const { name, type, filling, price } = req.body;
        const newEmpanada = await Empanada.create({ name, type, filling, price });
        res.status(201).json(newEmpanada);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear empanada' });
    }
});

app.put('/api/empanada/:id', express.json(), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, filling, price, is_sold_out } = req.body;
        const empanada = await Empanada.findByPk(id);
        if (!empanada) {
            return res.status(404).json({ error: 'Empanada no encontrada' });
        }
        await empanada.update({ name, type, filling, price, is_sold_out });
        res.json(empanada);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar empanada' });
    }
});

app.delete('/api/empanada/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const empanada = await Empanada.findByPk(id);
        if (!empanada) {
            return res.status(404).json({ error: 'Empanada no encontrada' });
        }
        await empanada.destroy();
        res.json({ message: 'Empanada eliminada' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar empanada' });
    }
});

app.listen(port, () => {
  console.log(`Backend escuchando en puerto ${port}`);
});
