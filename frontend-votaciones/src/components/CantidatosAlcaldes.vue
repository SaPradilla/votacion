<script setup>
    import {reactive,ref,onMounted,watch} from 'vue'
    import Formulario from '../views/Formulario.vue';
    import ApiService from '../services/candidatoService'
    const existe = ref(false)
    const candidatos = ref({})
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
            .then((respuesta) => candidatos.value = respuesta.data.Cliente)
            .catch(error => console.log('Hubo un error'))
    })

    watch(existe ,()=>{
        localStorage.setItem('existe', JSON.stringify(existe.value))
        console.log(existe.value)
        console.log('esto xddddddddddd')
    })
    
</script>

<template>
    <div v-if="existe">
        <h1>Canditos aqui</h1>
    </div>
    <Formulario 
    v-else
    v-model:existe="existe"
    />
</template>
