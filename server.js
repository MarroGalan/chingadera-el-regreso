const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const port = process.env.port || 3000;


app.use(cors());
app.use(express.json());

app.get('/tareas', (req, res) => {
    db.all("select * from tasks", (err, rows) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});

app.post('/tarea', (req, res) => {
    const { id, text } = req.body;
    const stmt = db.prepare("INSERT INTO tasks (id, text) VALUES (?, ?)");
    stmt.run(id, text, function(err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({ id, text });
    });
    stmt.finalize();
});

app.put('/tarea/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const stmt = db.prepare("UPDATE tasks SET text = ? WHERE id = ?");
    stmt.run(text, id, function(err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({ id, text });
    });
    stmt.finalize();
});

app.delete('/tarea/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    stmt.run(id, function(err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(204).send();
    });
    stmt.finalize();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});