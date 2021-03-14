export default [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Login" */ './views/Home.vue')
    },
    // {
    //   path: '/builder',
    //   name: 'builder',
    //   component: () => import(/* webpackChunkName: "Sales" */ './views/Builder.vue'),
    //   meta:{ requiresAuth: true }
    // },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "Sales" */ './views/NotFound.vue'),      
    }     
  ]