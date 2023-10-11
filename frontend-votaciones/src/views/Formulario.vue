<script setup>
    import { FormKit } from '@formkit/vue'
    import {reactive,ref} from 'vue'
    import RouterLink from '../components/UI/RouterLink.vue';
    import ServiceApi from '../services/VotanteService.js'
    import Spinner from '../components/Spinner.vue';
    const emit = defineEmits(['update:existe'])

    const props = defineProps({
        seleccion: {
            type: String,
            required: true
        },
        existe:{
            type: Boolean,
            required: true
        },
 
    })
    const cargando = ref(false)

    const persona = reactive({
        nombre:'',
        apellido:'',
        tipo_documento:'',
        documento:'',
        numero_celular:'',
        tipo_seleccion: ''
    })

    const handleSubmit = (data) => {
        cargando.value = true
        data.tipo_seleccion = props.seleccion

        ServiceApi.agregarVotante(data)
            .then(respuesta => {
                console.log(respuesta)
                // Redireccionar
                // router.push({ name: 'votacion-'})
            })
            .catch(error => console.log(error))
        
        setTimeout(()=>{
            cargando.value = false
            emit('update:existe',true)
        },1500)
    }

</script>

<template>
    <div>

        <div class="flex justify-end">
            <RouterLink 
            style="background-color: #22c55e;"
                to="inicio"
            >
                Cancelar
            </RouterLink>
        </div>
        <div v-if="cargando" class="text-center">
            <Spinner/>
            <h2 class=" font-semibold text-3xl">Cargando los cantidatos...</h2>
        </div>
        <div v-else class="mx-auto mt-10 bg-white shadow">
            <h1 class="text-4xl py-6 text-green-500 text-center font-bold uppercase"> Registro </h1>
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    id="formulario"
                    :actions="false"
                    @submit="handleSubmit"
                    :value="persona"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre de Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Nombre es Obligatorio' }"
                        v-model="persona.nombre"
                    />

                    <FormKit 
                        type="text"
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido de Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Apellido es Obligatorio' }"
                        v-model="persona.apellido"

                    />
                    <FormKit
                        type="select"
                        label="Tipo de documento"
                        placeholder="Seleccione el tipo de documento"
                        name="tipo_documento"
                        :options="[
                            'CC',
                        ]"
                        help="Elige una opción para poder continuar"
                        validation="required"
                        v-model="persona.tipo_documento"

                    />
                    <FormKit 
                        type="text"
                        label="Documento"
                        name="documento"
                        placeholder="Número de documento"
                        v-model="persona.documento"


                    />
                    <FormKit 
                        type="text"
                        label="Número Celular"
                        name="numero_celular"
                        placeholder="Teléfono: XXX-XXX-XXXX"
                        v-model="persona.numero_celular"


                    />

                    <FormKit 
                        type="text"
                        label="Email"
                        name="email"
                        placeholder="Email de Cliente"
                        validation="required|email"
                        :validation-messages="{ required: 'El Email es Obligatorio', email: 'Coloca un email válido' }"
                        v-model="persona.correo"
                   
                    />
                    <FormKit
                        style="background-color:#22c55e ; width: 218px; height: 50px; text-align:center;  padding: 15px; text-align: center;"
                        type="submit"
                        label="Votar"
                    />
                </FormKit>
                
            </div>
        </div>
    </div>
</template>

<style >

    #formulario .formkit-wrapper {
        max-width: 100%;
    }

</style>