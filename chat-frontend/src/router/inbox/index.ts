import { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/inbox'
  },
  {
    path: '/inbox',
    name: 'Inbox',
    component: () => import('../../views/inbox/index.vue')
  },
  {
    path: '/message/:id',
    component: () => import('../../views/inbox/ViewMessagePage.vue')
  },
  // {
  //   path: '/details/:id?',
  //   name: 'detailsTires',
  //   component: () => import('../../views/balance/details.vue'),
  //   beforeEnter: (to: any, from: any, next: any) => {
  //     store.dispatch('validateToken')
  //       .then((response: any) => {
  //         next();
  //       })
  //       .catch(async (error: any) => {
  //         if (error.response.status === 401) {
  //           next('/login');
  //           console.log(error.response.status);
  //           await window.database.logOutPreferences();
  //         }
  //       });
  //   },
  // }
]

export default routes