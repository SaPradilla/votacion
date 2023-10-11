<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import RouterLink from '../components/UI/RouterLink.vue';

import ApiServiceCandidatos from '../services/candidatoService'
import ApiServiceVotar from '../services/votosService'

import Login from '../views/Login.vue';
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const token = ref('')
const candidatos = ref([])
const seleccion = ref('')
const seleccionado = ref(false)
const candidatoSeleccionado = ref({})
const identificadorPersona = ref(0)


onMounted(() => {
    seleccion.value = route.params.seleccion
    ObtenerToken()
    ApiServiceCandidatos.obtenerCandidatos()
            .then(respuesta => {
                respuesta.data.Candidatos
                candidatos.value = respuesta.data.Candidatos
            })
            .catch(error => console.log('Hubo un error'))
})

watch(token, () => {
    ObtenerToken()

})
const ObtenerToken = () => {
    // Obtiene el token de localstorage y si es existe
    if (localStorage.getItem('token')) {
        // Guarda el token en setToken y lo asigna a state
        token.value = localStorage.getItem('token')
    } 
}

const Seleccionar = (candidato)=>{    
    candidatoSeleccionado.value = candidato
    seleccionado.value = true
}

const Votar = (candidato)=>{
    if (window.confirm(`Quiere votar por el candidato ${candidato.nombre} `)) {
        ApiServiceVotar.Votar(seleccion.value,candidatoSeleccionado.value.id,)
            .then(respuesta=>{
                console.log(respuesta)
                console.log('Votando..')
            })
            console.log('Votando..')
            console.log(candidato)
    }
}
</script>

<template>

    <!-- Si token existe es porque esta logueado y muestra este contenedor -->
    <div v-if="token" class="contenedor">
        <div class="flex justify-end">
            <RouterLink 
                style="background-color: #22c55e;"
                to="inicio"
            >
                Volver
            </RouterLink>
        </div>
        <h1 class=" text-4xl  font-bold uppercase text-center"> Candidatos </h1>

        <div class="flex">
            <!-- :class="seleccionado ?'bg-green-100 -translate-y-1': 'bg-slate-50' " -->
            <div 
                v-for="candidato in candidatos" 
                @click="Seleccionar(candidato)"
                :key="candidato.div"
                :class="{ 'seleccionado': candidato.id === candidatoSeleccionado.id }"
                class="candidato  w-80 max-h-max  m-12 p-7 shadow-2xl  cursor-pointer"

            >
                <img class=" m-auto border-green-600 border-4  rounded-full w-44 h-44" :src="`http://localhost:5650/candidatos/${candidato.foto}`" alt="nose" srcset="">

                <h3 class="  text-center text-green-600  text-3xl font-semibold">{{candidato.nombre}} {{ candidato.apellido }}</h3>
                <h3 class=" mb-16 text-center text-neutral-800 italic  text-2xl font-semibold"> {{candidato.cargo_postulante}}</h3>
                <div class="biografia">
                    <h3 class=" break-words text-neutral-800  text-xl font-semibold">{{candidato.biografia}} lor</h3>
                </div>
            </div>

        </div>
        <div 
            v-if="seleccionado"
            class="boton flex justify-center mt-44 mr-8">

            <FormKit
                style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px;"
                class=" "
                type="button"
                @click="Votar(candidatoSeleccionado)"
            >
            <p>Votar por <span class="font-bold"> {{ candidatoSeleccionado.nombre  }}</span></p> 

            </FormKit>
            </div>
    </div>

    <!-- Sino Se logea -->
    <div v-else class=" ">
        <h1 class=" font-bold text-4xl text-center ">Inicia Sesion para Votar</h1>
        <Login 
            v-model:identificadorPersona="identificadorPersona"
            :seleccion="seleccion"
            v-model:token="token" 
        />
    </div>
</template>
<style>
    .seleccionado {
        border: solid #22c55e 3px;
        background-color: #E6FFFA;
        width: 19.9rem

    }

</style>