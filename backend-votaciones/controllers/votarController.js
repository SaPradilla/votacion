const db = require('../models')
const Voto = db.votos

const Create = async(req,res)=>{
    const {candidatoId,votanteId} = req.params 
    try{
        // metodos para validar la existencia de los ids

        const nuevoVoto = Voto.create({
            candidatoId,
            votanteId
        })
        return res.status(200).json({
            msg:'Se ha registrado el voto',
            voto: nuevoVoto
        })

    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al votar',
            errroName : error.name,
            error: error
        })
    }
}

const Listar = async(req,res)=>{
    try{
        // metodos para validar la existencia de los ids
        const Votos = Voto.findAll({
            include:[
                {
                    model:db.candidatoId
                },
                {
                    model:db.votante
                }
            ]
        })

        return res.json({
            msg:'Se ha listado los votos con exito',
            Votos: Votos
        })

    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al listar los votos',
            errroName : error.name,
            error: error
        })
    }
}

const VerVotosCandidato = async(req,res)=>{
    const { id } = req
    try{
        // metodos para validar la existencia de los ids
        const Votos = Voto.findOne({
            where:{
                candidatoId: id
            },
            include:[
                {
                    model:db.votante
                }
            ]
        })

        return res.json({
            msg:'Se ha visualizar el voto con exito',
            Votos: Votos
        })

    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al visualizar el voto',
            errroName : error.name,
            error: error
        })
    }
}


module.exports = {Create,VerVotosCandidato,Listar}