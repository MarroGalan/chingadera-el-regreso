const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Para una base de datos en memoria (cambia a un archivo para persistencia)

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, text TEXT)");
});

module.exports = db;