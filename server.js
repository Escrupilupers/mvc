require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/characterRoutes');
const sequelize = require('./config/db');

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Usar las rutas de personajes
app.use('/api', characterRoutes);

// Probar la conexión a la base de datos antes de iniciar el servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
        // Sincronizar la base de datos
        return sequelize.sync();
    })
    .then(() => {
        console.log('Base de datos sincronizada');
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar o sincronizar la base de datos:', err);
    });


module.exports = app;