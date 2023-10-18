<script setup>
import { RouterView,useRouter } from 'vue-router'
import {onMounted,ref,watch} from 'vue'
const logueado = ref(false)
const router = useRouter()
onMounted(()=>{
  validarLogeo()
})

// Para escuchar los cambios del state token con 
// Event Bus (Autobús de Eventos)
// Terminar aqui
watch(localStorage.getItem('token'), ()=>{
  validarLogeo()
})
const logout = () =>{
  localStorage.clear()
  router.push({ name:'inicio'})
  logueado.value = false

}
const validarLogeo = ()=>{
  if(localStorage.getItem('token')){
    logueado.value = true
  }
  return 
}
</script>

<template>
  <header class=" bg-green-500">
    <div class=" mx-auto max-w-6xl py-10">
      <h1 class="text-4xl text-center font-bold  text-white">
        VOTACIONES
      </h1>
    </div>
    <nav v-if="logueado" class="float-right -mt-20  ">
      <div 
      @click="logout"
      >
        <img class=" cursor-pointer w-16 min-[700px]:hidden max-[700px]:-mt-3 max-[700px]:-mr-22" src="./assets/img/salirIcono.png" alt="" srcset="">
        <p class=" cursor-pointer uppercase text-2xl font-semibold hidden md:block min-[700px]:mr-10 text-white">Cerrar Sesión</p>
      </div>
    </nav>
   



    

  </header>
  <main class="max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>

