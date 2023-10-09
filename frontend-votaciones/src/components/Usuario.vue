<script setup>
    import { computed } from 'vue'
    import { RouterLink } from 'vue-router'
    import moment from 'moment';
    const props = defineProps({
        usuario: {
            type: Object
        }
    })
    
    defineEmits(['eliminar-cliente'])

</script>


<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <p class=" text-gray-900 font-bold">{{ usuario.nombre }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{usuario.apellido}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{usuario.numero_celular}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{usuario.email}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{usuario.direccion}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{ moment(usuario.fecha_nacimiento).format("YYYY-MM-DD")}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{usuario.rol}}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{usuario.isAdmin}}</p>
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
                :to="{ name: 'editar-usuario', params: { id: usuario.id } }"
                class="text-indigo-600 hover:text-indigo-900 mr-5"
            >Editar</RouterLink>

            <button
                class="text-red-600 hover:text-red-900"
                >
                <!-- @click="$emit('eliminar-cliente', usuario.id)" -->
                Eliminar
            </button>
        </td>
    </tr>
</template>
