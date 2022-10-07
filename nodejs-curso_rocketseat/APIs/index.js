const express = require('express');

const app = express();

app.listen('3000')

//middleware
app.use(express.json())

app.route('/').post( (req, res) => {
    const {nome, cidade} = req.body
    res.send(`Meu nome é ${nome} e moro na cidade ${cidade}.`)
})

console.log('Rodando')



// PUT //
// let author = 'João Pedro'

// app.route('/').get((req, res) => res.send(author))

// app.route('/').put((req, res) => {
//     author = req.body.author
//     res.send(author)
// })


// POST //
// app.route('/').post((req, res) => res.send(req.body))


// GET //
// app.route('/').get((req, res) => res.send('Olá, Mundo!'))
// app.route('/sobre').get((req, res) => res.send('Olá, Mundo! Denovo.'))


// DELETE //
// app.route('/:identificador').delete((req, res) => {
//     res.send(req.params.identificador)
// })

// console.log('Rodando')