const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
app.use(express.json());

const db = 'mongodb+srv://vladkekww:qwertyLP@mongodb.njewa09.mongodb.net/?retryWrites=true&w=majority&appName=blogposts'
mongoose
.connect(db,{useUnifiedTopology: true})
.then((res)=>console.log('підключено до БД'))
.catch((err)=>console.log(err)); 

app.get('/posts/mongodb', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error('Помилка отримання постів з MongoDB:', err);
        res.status(500).send('Помилка отримання постів з MongoDB');
    }
});

app.post('/posts/mongodb', async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = new Post({ title, content });
        await post.save();
        console.log('Пост успішно доданий до MongoDB:', post);
        res.status(201).send('Пост успішно доданий до MongoDB');
    } catch (err) {
        console.error('Помилка збереження поста у MongoDB:', err);
        res.status(500).send('Помилка збереження поста у MongoDB');
    }
});

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

 
app.get('/posts/postgresql', (req, res) => {
    pool.query('SELECT * FROM posts', (err, result) => {
        if (err) {
            console.error('Помилка запиту до бази даних PostgreSQL:', err);
            res.status(500).send('Помилка запиту до бази даних PostgreSQL');
        } else {
            res.json(result.rows);
        }
    });
});

app.post('/posts/postgresql', (req, res) => {
    const { title, content } = req.body;

    pool.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content], (err, result) => {
        if (err) {
            console.error('Помилка додавання поста у PostgreSQL:', err);
            res.status(500).send('Помилка додавання поста у PostgreSQL: ' + err.message);
        } else {
            console.log('Пост успішно доданий до бази даних PostgreSQL');
            res.status(201).send('Пост успішно доданий до бази даних PostgreSQL');
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});