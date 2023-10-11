const db = require('../models')
const Votante = db.votante
const Encrypt = require('../middleware/auth')
const jwt = require('jsonwebtoken')

const Create = async (req, res) => {
    const { nombre, apellido, tipo_documento, documento, numero_celular, correo, tipo_seleccion } = req.body
    try {

        if (tipo_documento == 'TI' && tipo_seleccion !== 'Asamblea' && tipo_seleccion !== 'Representante SENA') {
            return res.json({
                msg: 'Los menores de edad solo pueden votar en Asamblea y en Representante SENA'
            })
        }
        const password_hash = await Encrypt.cryptPassword(req.body.contrasena)

        const newVotante = await Votante.create({
            nombre: nombre,
            apellido: apellido,
            tipo_documento: tipo_documento,
            documento: documento,
            numero_celular: numero_celular,
            correo: correo,
            contrasena: password_hash
        })

        return res.status(200).json({
            msg: 'Votante regitrado correctamente',
            Votante: newVotante
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al realizar el registro',
            errroName: error.name,
            error: error
        })
    }
}

const Login = async (req, res) => {
    const { documento, contrasena } = req.body
    // try {
        const votanteLogin = await Votante.findOne(
            {
                where: {
                    documento: documento
                }
            })
        if(!votanteLogin){
            return res.status(404).json({
                msg:'No existe la cuenta del votante'
            })
        }

        const contrasena_comparada = await Encrypt.comparePassword(contrasena, votanteLogin.contrasena)

        if (!contrasena_comparada) { return Response.unauthorizedResponse(res, 'Credenciales incorrectas') }
        
        const votante = { ...votanteLogin }
        delete votante.dataValues.contrasena
        
        const token = jwt.sign(
            { votante }, process.env.TOKEN_KEY, { expiresIn: "2h", }
        )
        return res.header('auth-token', token).json({
            error: null,
            msg:'Inicio de sesion exitoso.',
            data: {token}
        })

    // } catch (error) {
    //     return res.json({
    //         msg:'Error al loguear',
    //         error
    //     })
    // }
}

module.exports = { Create ,Login }