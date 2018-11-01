import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../components/auth/Login'
import store from '../store/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: "*", redirect: '/about' },
    { path: '/', redirect: '/notes' },
    {
      path: '/notes',
      name: 'home',
      component: Home,
      meta: { auth: true }
    },{
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { auth: false }
    },
  ]
})

router.beforeEach((to, from, next) => {
    if (!store.getters.isLogged && to.meta.auth) {
        return next('/login')
    }
    if (store.getters.isLogged && !to.meta.auth) {
        return next('/notes')
    }
    next()
})

export default router
