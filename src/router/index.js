import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/project.vue')
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import(/* webpackChunkName: "about" */ '../views/logs.vue')
  },
  {
    path: '/detail/:id',
    name: 'logs',
    component: () => import(/* webpackChunkName: "about" */ '../views/detail.vue')
  },
  {
    path: '/performance',
    name: 'Performance',
    component: () => import(/* webpackChunkName: "about" */ '../views/performance.vue')
  },
  {
    path: '/device',
    name: 'device',
    component: () => import(/* webpackChunkName: "about" */ '../views/device.vue')
  },
  {
    path: '/api',
    name: 'api',
    component: () => import(/* webpackChunkName: "about" */ '../views/apiError.vue')
  },
  {
    path: '/api/:id',
    name: 'apiDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/apiDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
