<script setup>
import { FormKit } from '@formkit/vue'
import { reactive, ref,onMounted ,watch} from 'vue'
import ServiceApi from '../services/VotanteService.js'
import Spinner from '../components/Spinner.vue';
import Alerta from '../components/Alerta.vue';

const emit = defineEmits(['update:token','update:identificadorPersona','update:tieneCuenta','update:isMenorEdad'])
const cargando = ref(false)
const Error = ref('')
const persona = reactive({
    documento: '',
    contrasena: ''
})

const handleSubmit = (data) => {
    cargando.value = true
    let findtoken
    ServiceApi.loguearVotante(data)
        .then(respuesta => {
            localStorage.setItem('token', respuesta.data.data.token)
            findtoken = respuesta.data.data.token
            // Añade el id al localstorage para luego validarlo
            localStorage.setItem('exits-user',respuesta.data.ide)
            emit('update:identificadorPersona',respuesta.data.ide)
            if(respuesta.data.isMenor){
                console.log('xd')
                localStorage.setItem('validationMenor',true)
                emit('update:isMenorEdad',true)
            }
            if(respuesta.data.permisosAdmin){
                localStorage.setItem('admin',true)
            }
        })
        .catch(error => {
            console.log(error)
            Error.value = 'Credenciales incorrectas'
        })
        
        setTimeout(() => {
            cargando.value = false
            console.log(findtoken)
            emit('update:token',findtoken)
        }, 1500)
        setTimeout(()=>{
            Error.value = ''
        },3000)

}
const registrarse = () => {
    emit('update:tieneCuenta',false)
}
</script>

<template>
    <div>
        <div v-if="cargando" class="text-center">
            <Spinner />
            <h2 class=" font-semibold text-3xl">Iniciando sesion...</h2>
        </div>
        <div v-else >
            <div v-if="Error">
                <Alerta>{{ Error }}</Alerta>
            </div>
            <h1 class="text-4xl py-6 text-green-500 text-center font-bold uppercase"> Iniciar Sesion </h1>
            <div class="">
                <FormKit type="form" id="formulario" :actions="false" @submit="handleSubmit" :value="persona">

                    <FormKit type="text" label="Documento" name="documento" placeholder="Número de documento"
                        v-model="persona.documento" />
                    <FormKit type="password" label="Contraseña" name="contrasena" placeholder="Ingrese su contraseña"
                        v-model="persona.contrasena" />
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center; "
                        type="submit" label="Loguear" />
                </FormKit>
              
            </div>
            <button  class=" justify-center" @click="registrarse">
                <p class=" cursor-pointer font-semibold text-lg text-gray-600 ">¿Aún no tienes una cuenta? <span class="text-gray-800">Registrate</span></p>
            </button>
        </div>
    </div>
</template>

<style >
#formulario .formkit-wrapper {
    max-width: 100%;
}
</style>