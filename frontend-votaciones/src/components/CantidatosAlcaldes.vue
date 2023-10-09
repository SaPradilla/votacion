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
    const urlImagen = (buffer)=>{
        const blob = new Blob([buffer])
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl

    }
    const mostrar = ()=>{
        const esto = urlImagen(candidatos.value[0].foto)
        console.log(esto)
    }
</script>

<template>
    <div  v-if="existe" class="contenedor">
        <h1 class=" text-4xl  font-bold uppercase text-center"> Candidatos </h1>
        <div class="flex">

                <div v-for="candidato in candidatos" class="  candidato max-w-max h-44  m-12 p-7 shadow-2xl">
                    <h3 class=" text-green-600  text-xl font-semibold">Nombre: <span class=" text-neutral-800 ">{{candidato.nombre}}</span></h3>
                    <h3 class=" text-green-600  text-xl font-semibold">Apellido: <span class=" text-neutral-800 ">{{candidato.apellido}}</span></h3>
                    <img :src="`http://localhost:5650/candidatos/${ urlImagen(candidato.foto)}`" alt="nose" srcset="">
                    <h3> {{ }} </h3>
                    <!-- <h3>Foto: <span>{{candidato.foto}}</span></h3> -->
                    <h3 class=" text-green-600  text-xl font-semibold">Biografia: <span class=" text-neutral-800 ">{{candidato.biografia}}</span></h3>
                    <h3 class=" text-green-600  text-xl font-semibold">Cargo: <span class=" text-neutral-800 ">{{candidato.cargo_postulante}}</span></h3>
                </div>

        </div>
        <button type="button" @click="mostrar">xd</button>
    </div>
    <Formulario 
    v-else
    v-model:existe="existe"
    />
</template>
