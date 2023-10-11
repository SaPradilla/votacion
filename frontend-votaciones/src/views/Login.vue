<script setup>
import { FormKit } from '@formkit/vue'
import { reactive, ref,onMounted ,watch} from 'vue'
import { useRouter } from 'vue-router'
import RouterLink from '../components/UI/RouterLink.vue';
import ServiceApi from '../services/VotanteService.js'
import Spinner from '../components/Spinner.vue';
const emit = defineEmits(['update:existe'])
const router = useRouter()

const props = defineProps({
    token: {
        type: String,
        required: true
    },
    seleccion:{
        type:String,
        required: true

    }
})

const cargando = ref(false)

const persona = reactive({
    documento: '',
    contrasena: ''
})

const handleSubmit = (data) => {
    cargando.value = true
    data.tipo_seleccion = props.seleccion
    let findtoken;
    ServiceApi.loguearVotante(data)
        .then(respuesta => {
            localStorage.setItem('token', respuesta.data.data.token)
            findtoken = respuesta.data.data.token
            // console.log(respuesta.data.data.token)
            // console.log(props.seleccion)
            // Redireccionar
        })
        .catch(error => console.log(error))
        
        setTimeout(() => {
            cargando.value = false
            emit('update:token',findtoken)
        }, 1500)

}
const redirigirRegistro = () => {
    router.push({ name: 'registro-votante' })
}
</script>

<template>
    <div>

        <div class="flex justify-end">
            <RouterLink style="background-color: #22c55e;" to="inicio">
                Cancelar
            </RouterLink>
        </div>
        <div v-if="cargando" class="text-center">
            <Spinner />
            <h2 class=" font-semibold text-3xl">Iniciando sesion...</h2>
        </div>
        <div v-else class="mx-auto mt-10 bg-white shadow">
            <h1 class="text-4xl py-6 text-green-500 text-center font-bold uppercase"> Iniciar Sesion </h1>
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit type="form" id="formulario" :actions="false" @submit="handleSubmit" :value="persona">

                    <FormKit type="text" label="Documento" name="documento" placeholder="Número de documento"
                        v-model="persona.documento" />
                    <FormKit type="password" label="Contraseña" name="contrasena" placeholder="Ingrese su contraseña"
                        v-model="persona.contrasena" />
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center;"
                        type="submit" label="Loguear" />

                </FormKit>
                <button @click="redirigirRegistro">
                    <p class=" font-semibold text-xl">Aun no tienes una cuenta?</p>
                </button>
            </div>
        </div>
    </div>
</template>

<style >
#formulario .formkit-wrapper {
    max-width: 100%;
}
</style>