import Vue from 'vue'
import Router from 'vue-router'
import UserLocation from '@/pages/UserLocation'
import FrontPage from '@/pages/FrontPage'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: FrontPage
  },
  {
    path:'/UserLocation',
    component: UserLocation
  }]
})
