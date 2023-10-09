const db = require('../models')
const Votante = db.votante

const Create = async(req,res)=>{
    const {nombre,apellido,tipo_documento,documento,numero_celular,correo,tipo_seleccion} = req.body
    try{
        if(tipo_documento == 'TI' && tipo_seleccion !== 'Asamblea' && tipo_seleccion !== 'Representante SENA') {
            return res.json({
                msg:'Los menores de edad solo pueden votar en Asamblea y en Representante SENA'
            }) 
        }
        console.log(tipo_seleccion)
        const newVotante = await Votante.create({
            nombre:nombre,
            apellido:apellido,
            tipo_documento:tipo_documento,
            documento:documento,
            numero_celular:numero_celular,
            correo:correo
        })

        return res.status(200).json({
            msg:'Votante regitrado correctamente',
            Votante: newVotante
        })

    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al realizar el registro',
            errroName : error.name,
            error: error
        })
    }
} 

module.exports = {Create}