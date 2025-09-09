const express = require('express');
const sequelize = require('./models');
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



app.listen(port, () => {
  console.log(`Backend escuchando en puerto ${port}`);
});
