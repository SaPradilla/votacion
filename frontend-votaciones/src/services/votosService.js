import api from "../lib/axios";

export default {
    Votar(seleccion,candidato,data) {
        return api.post(`votos/registrar/${seleccion}/${candidato}`, data)
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
