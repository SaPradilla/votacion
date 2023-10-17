<script setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import {useRoute} from 'vue-router'
    import ApiServiceVotar from '../services/votosService'

    const route = useRoute()
    const seleccion = ref('')
    const votos = ref([])

    onMounted(()=>{
        seleccion.value = route.params.seleccion
        ApiServiceVotar.obtenerVotos(seleccion.value)
            .then(respuesta =>{
                votos.value = respuesta.data.Votos 
                console.log(votos.value)
            })
            .catch(error=> console.log(error))
    })




</script>

<template>
    <div>
        Votos de los {{ seleccion }}s
    </div>
</template>
