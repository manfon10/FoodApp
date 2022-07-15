const process = require('dotenv').config();
const { initModels } = require('./models/initModels');

const { app } = require('./app');

// Utils
const { db } = require('./database/database');

// Authenticate database credentials
db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err));

// Establish models relations
initModels();

// Sync sequelize models
db.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

// Spin up server
const PORT = process.parsed.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`);
});