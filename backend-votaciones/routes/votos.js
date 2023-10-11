const express = require('express')
const router = express.Router()
// controlador 
const Controller = require('../controllers/votarController')

router 
    .post('/registrar/:candidatoId/:votanteId',Controller.Create)
    .get('/listar',Controller.Listar)
    .get('/ver-votos/:id', Controller.VerVotosCandidato)

module.exports = router