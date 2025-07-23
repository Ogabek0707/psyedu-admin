import { createRouter, createWebHistory } from 'vue-router'
import auth from './auth'
import main from './main'
import { isAllowedNavigation, resetNavigationFlag } from '@/utils/navigationGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    auth,
    main,
    {
      path: "/notfound",
      name: "notfound",
      component: () => import('../views/NotFound.vue'),
    }
  ],
})

// Global guard

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  if (to.name === 'login') {
    resetNavigationFlag()
    return next()
  }

  if (!isAllowedNavigation()) {
    // Faqat router.push() orqali ruxsat beriladi
    return next({ name: 'notfound' })
  }

  if (!token) {
    return next({ name: 'login' })
  }

  resetNavigationFlag()
  return next()
})



export default router
