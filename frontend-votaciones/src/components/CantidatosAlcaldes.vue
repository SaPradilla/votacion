<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import RouterLink from '../components/UI/RouterLink.vue';

import ApiService from '../services/candidatoService'
import Login from '../views/Login.vue';
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const token = ref(null)
const candidatos = ref([])
const seleccion = ref('')


onMounted(() => {
    seleccion.value = route.params.seleccion
    ObtenerToken()
})


onMounted(() => {
    ApiService.obtenerCandidatos()
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
    } else {
        // Sino lo asigna a null
        token.value = null
    }
}

const Votar = (id)=>{
    console.log(id)
}
</script>

<template>

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
            <div 
            v-for="candidato in candidatos" 
            @click="Votar(candidato.id)"
            class="candidato  w-80 max-h-max  m-12 p-7 shadow-2xl hover:bg-green-100 hover:-translate-y-1  duration-300 cursor-pointer"
            >
                <img class=" m-auto border-green-600 border-4  rounded-full w-44 h-44" :src="`http://localhost:5650/candidatos/${candidato.foto}`" alt="nose" srcset="">
                <h3 class="  text-center text-green-600  text-3xl font-semibold">{{candidato.nombre}} {{ candidato.apellido }}</h3>
                <h3 class=" mb-16 text-center text-neutral-800 italic  text-2xl font-semibold"> {{candidato.cargo_postulante}}</h3>
                <div class="biografia">
                    <h3 class=" break-words text-neutral-800  text-xl font-semibold">{{candidato.biografia}} lor</h3>
                </div>
            </div>
        </div>
    </div>
    <div v-else class=" ">
        <h1 class=" font-bold text-4xl text-center ">Inicia Sesion para Votar</h1>
        <Login 
            :seleccion="seleccion"
            v-model:token="token" 
        />
    </div>
    <!-- <Formulario 
        
        
    /> -->
</template>
