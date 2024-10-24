const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Configuração do banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'lambda',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    }
});

const app = express();
app.use(bodyParser.json());

// POST /produto - Adicionar um novo produto
app.post('/produto', async (req, res) => {
    const { descricao, preco, estoque, data } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Produto (descricao, preco, estoque, data) VALUES ($1, $2, $3, $4) RETURNING *',
            [descricao, preco, estoque, data]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /produtos - Listar todos os produtos
app.get('/produtos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Produto');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /produto/:id - Obter um produto pelo ID
app.get('/produto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Produto WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /produto/:id - Atualizar um produto pelo ID
app.put('/produto/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, preco, estoque, data } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Produto SET descricao = $1, preco = $2, estoque = $3, data = $4 WHERE id = $5 RETURNING *',
            [descricao, preco, estoque, data, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /produto/:id - Deletar um produto pelo ID
app.delete('/produto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Produto WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
