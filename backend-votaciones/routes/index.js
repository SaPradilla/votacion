const express = require('express')
const router = express.Router()
const VotanteRoute = require('./votantes')
const CandidatoRoute = require('./candidatos')

const routersList = [
    {
        path:'/votante',  
        route:VotanteRoute
    },
    {
        path:'/candidato',  
        route:CandidatoRoute
    }
]
//En rutador
routersList.forEach((route) =>{
    router.use(route.path, route.route)
})
module.exports = router
