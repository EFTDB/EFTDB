import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/weapons',
    name: 'Weapons',
    component: () => import(/* webpackChunkName: "weapons" */ '../views/Weapons.vue')
  },
  {
    path: '/attachments',
    name: 'Attachments',
    component: () => import(/* webpackChunkName: "weapons" */ '../views/Attachments.vue')
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
  },
  {
    path: '/armor',
    name: 'Armor',
    component: () => import(/* webpackChunkName: "armor" */ '../views/Armor.vue')
  },
  {
    path: '/rigs',
    name: 'Rigs',
    component: () => import(/* webpackChunkName: "rigs" */ '../views/Rigs.vue')
  },
  {
    path: '/backpacks',
    name: 'Backpacks',
    component: () => import(/* webpackChunkName: "backpacks" */ '../views/Backpacks.vue')
  },
  {
    path: '/maps',
    name: 'Maps',
    component: () => import(/* webpackChunkName: "maps" */ '../views/Maps.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import(/* webpackChunkName: "status" */ '../views/Status.vue')
  },
  {
    path: '/weapon/:name',
    name: 'Weapon',
    component: () => import(/* webpackChunkName: "weapons" */ '../views/Weapon.vue')
  },
  {
    path: '/attachment/:name',
    name: 'Attachment',
    component: () => import(/* webpackChunkName: "weapons" */ '../views/Attachment.vue')
  },
  {
    path: '*',
    name: '404 Not Found',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
})

export default router
