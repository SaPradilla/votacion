import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../components/Inicio.vue'
import CantidatosAlcaldes from '../views/FormularioCantidato.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/votar/:seleccion',
      name: 'formAlcalde',
      component: () => import('../components/CantidatosAlcaldes.vue'),
      props: true,
    },
    {
      path: '/registrar-votante/:seleccion',
      name: 'registro-votante',
      component: () => import('../views/Formulario.vue'),
      props: true,

    },{

      path:'/candidato/registrar',
      name:'formCandidato',
      component : CantidatosAlcaldes
    }
  ]
})

export default router
