const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PassWord',
  database: 'sqlitest'
});

app.post('/login-vulneravel', (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  const query = `SELECT * FROM usuarios WHERE usuario = '${usuario}' AND senha = '${senha}'`;

  console.log("Executando:", query);

  connection.query(query, (err, results) => {
    if (err) return res.status(500).send('Erro no servidor.');
    if (results.length > 0) {
      res.send('Login bem-sucedido.');
    } else {
      res.send('Falha no login.');
    }
  });
});


app.post('/login-seguro', (req, res) => {
    const { usuario, senha } = req.body;
    const query = "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?";
  
    connection.execute(query, [usuario, senha], (err, results) => {
      if (err) return res.status(500).send('Erro no servidor.');
      if (results.length > 0) {
        res.send('Login seguro bem-sucedido.');
      } else {
        res.send('Falha no login.');
      }
    });
  });

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});