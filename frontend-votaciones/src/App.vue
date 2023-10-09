<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <header class=" bg-green-500">
      <div class="mx-auto max-w-6xl py-10">
          <h1 class="text-4xl text-center font-bold  text-white">
              VOTACIONES
          </h1>
      </div>
  </header>
  <main class="max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>

