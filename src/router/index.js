import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TVDetails from '@/views/TVDetails.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tv/:id', name: 'TVDetails', component: TVDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
