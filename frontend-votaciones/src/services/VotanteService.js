import api from "../lib/axios";

export default {
    agregarVotante(data) {
        return api.post('/votante/registrar', data)
    },
    loguearVotante(data){
        return api.post('/votante/login',data)
    }
    // actualizarUsuario(id, data) {
    //    return api.put('/admin/edit/user/' + id,data)
    // },
    // cambiarEstado(id, data) {
    //     return api.patch('/clientes/' + id, data)
    // },
    // eliminarCliente(id) {
    //     return api.delete('/clientes/' + id)
    // }
}
