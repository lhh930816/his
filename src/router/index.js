import Vue from 'vue'
import Router from 'vue-router'
// import JCBG from '@/views/YSGZZ/JCBG'
// import { resolve } from 'url';
// import JYBG from '@/views/YSGZZ/JYBG'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/JCBG'
    },
    {
      path: '/JCBG',
      component: resolve => require(['@/views/YSGZZ/JCBG.vue'], resolve)
    }
    // {
    //   path: '/',
    //   name: 'JYBG',
    //   component: JYBG
    // }
  ]
})
