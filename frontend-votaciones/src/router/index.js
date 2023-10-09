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
      path: '/votar-alcalde',
      name: 'formAlcalde',
      component: () => import('../components/CantidatosAlcaldes.vue'),
      props: { seleccion: 'Alcalde' }
    },
    {
      path: '/votar-gobernador',
      name: 'formGobernador',
      component: () => import('../views/Formulario.vue'),
      props: { seleccion: 'Gobernador' }
    },
    {
      path: '/votar-junta',
      name: 'formJunta comunal',
      component: () => import('../views/Formulario.vue'),
      props: { seleccion: 'Junta comunal' }
    },
    {
      path: '/votar-gobernador',
      name: 'formRepresentante SENA',
      component: () => import('../views/Formulario.vue'),
      props: { seleccion: 'Representante SENA' }
    },
    {
      path: '/votar-gobernador',
      name: 'formAsamblea',
      component: () => import('../views/Formulario.vue'),
      props: { seleccion: 'Asamblea' }
    },{

      path:'/candidato/registrar',
      name:'formCandidato',
      component : CantidatosAlcaldes
    }
  ]
})

export default router
