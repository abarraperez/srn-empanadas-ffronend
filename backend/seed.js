const Empanada = require('./models/Empanada');
const sequelize = require('./models');

async function seedEmpanadas() {
  await sequelize.sync();
  const empanadas = [
    { type: 'Horno', name: 'Pino', filling: 'Carne, cebolla, huevo, aceituna', price: 1800 },
    { type: 'Frita', name: 'Queso', filling: 'Queso', price: 1500 },
    { type: 'Horno', name: 'Vegetariana', filling: 'Verduras, queso', price: 1700 },
    { type: 'Frita', name: 'Camarón queso', filling: 'Camarón, queso', price: 2200 },
  ];
  await Empanada.bulkCreate(empanadas);
  console.log('Empanadas seed insertadas');
  process.exit();
}

seedEmpanadas();
