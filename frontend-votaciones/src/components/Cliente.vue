<script setup>
    import { computed } from 'vue'
    import { RouterLink } from 'vue-router'

    const props = defineProps({
        cliente: {
            type: Object
        }
    })

    defineEmits(['eliminar-cliente'])


    
</script>


<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <p class=" text-gray-900 font-bold">{{ cliente.nombre }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{cliente.apellido}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{cliente.numero_celular}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{cliente.email}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{cliente.direccion}}</p>
        </td>
        <!-- <td class="whitespace-nowrap px-3 py-4 text-sm">
           <button
                class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                :class="[estadoCliente ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
                @click="$emit('actualizar-estado', 
                    {id: cliente.id, estado: cliente.estado})"
             >
                {{ estadoCliente ? 'Activo' : 'Inactivo' }}
           </button>
        </td> -->
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
            <RouterLink 
                :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
                class="text-indigo-600 hover:text-indigo-900 mr-5"
            >Editar</RouterLink>

            <button
                class="text-red-600 hover:text-red-900"
                @click="$emit('eliminar-cliente', cliente.id)"
            >
                Eliminar
            </button>
        </td>
    </tr>
</template>
