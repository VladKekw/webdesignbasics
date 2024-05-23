const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'qwerty',
    port: 5432, 
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('Помилка підключення до бази даних PostgreSQL:', err);
    } else {
        console.log('Підключено до бази даних PostgreSQL');
    }
});

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());
 
app.get('/posts', (req, res) => {
    pool.query('SELECT * FROM posts', (err, result) => {
        res.setHeader('Access-Control-Allow-Credentials', true);
        if (err) {
            console.error('Помилка запиту до бази даних:', err);
            res.status(500).send('Помилка запиту до бази даних');
        } else {
            res.json(result.rows);
        }
    });
});


app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  pool.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content], (err, result) => {
      if (err) {
          console.error('Помилка додавання поста:', err);
          res.status(500).send('Помилка додавання поста: ' + err.message);
      } else {
          console.log('Пост успішно доданий до бази даних');
          res.status(201).send('Пост успішно доданий до бази даних');
      }
  });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
    