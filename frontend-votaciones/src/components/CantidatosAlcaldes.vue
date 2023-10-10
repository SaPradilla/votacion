<script setup>
    import {reactive,ref,onMounted,watch} from 'vue'
    import Formulario from '../views/Formulario.vue';
    import ApiService from '../services/candidatoService'
    import Helper from '../helper/index'

    const existe = ref(false)
    const candidatos = ref([])
    // const candidatos = reactive({
    //     nombre:'',
    //     apellido:'',
    //     foto:'',
    //     biografia:'',
    //     cargo_postulante:'',
    // })

    onMounted(()=>{
        // Obtener la cadena desde localStorage y convertirla a una variable
        const existeGuardado = JSON.parse(localStorage.getItem('existe'));
        // Si existeGuardado no es null, puedes asignarlo nuevamente a tu variable
        console.log(typeof existeGuardado)
        console.log(existeGuardado)
        if (existeGuardado) {
            console.log('ola')
            existe.value = true
            return 
        }
        console.log(existe.value)
        console.log('esto xd')
    })
    
    
    onMounted(() => {
        ApiService.obtenerCandidatos()
            .then(respuesta => {
  
                respuesta.data.Candidatos
                candidatos.value = respuesta.data.Candidatos

            })
            .catch(error => console.log('Hubo un error'))
    })

    watch(existe ,()=>{
        localStorage.setItem('existe', JSON.stringify(existe.value))
        console.log(existe.value)
        console.log('esto xddddddddddd')
    })
</script>

<template>
    <div  v-if="existe" class="contenedor">
        <h1 class=" text-4xl  font-bold uppercase text-center"> Candidatos </h1>
        <div class="flex">

                <div v-for="candidato in candidatos" class="candidato  w-80 max-h-max  m-12 p-7 shadow-2xl">
                    <img class=" m-auto border-green-600 border-4  rounded-full w-44 h-44" :src="`http://localhost:5650/candidatos/${candidato.foto}`" alt="nose" srcset="">
                    <h3 class="  text-center text-green-600  text-3xl font-semibold">{{candidato.nombre}} {{ candidato.apellido }}</h3>
                    <h3 class=" mb-16 text-center text-neutral-800 italic  text-2xl font-semibold"> {{candidato.cargo_postulante}}</h3>
                    <div class="biografia">
                        <h3 class=" break-words text-neutral-800  text-xl font-semibold">{{candidato.biografia}} lor</h3>
                    </div>
                </div>

        </div>
    </div>
    <Formulario 
    v-else
    v-model:existe="existe"
    />
</template>
