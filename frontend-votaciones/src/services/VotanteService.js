import api from "../lib/axios";

export default {
    agregarVotante(data) {
        return api.post('/votante/registrar', data)
    },
    agregarCantidatos(data){
        return api.post('/candidato/registrar',data)
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
