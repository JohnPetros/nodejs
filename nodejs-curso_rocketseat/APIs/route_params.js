const express = require('express');

const app = express();

app.listen('3000')

app.route('/').get( (req, res) => res.send('Olá, Mundo!'))
app.route('/:nome').get( (req, res) => res.send(req.params.nome))
app.route('/identidade/:nome').get( (req, res) => res.send(req.params.nome))

console.log('Rodando')