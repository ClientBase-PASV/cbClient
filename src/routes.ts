import v1Routes from './v1Routes';
import defaultRoutes from './defaultRoutes';

export default [
  {
    path: '/v1',
    component: '@/layout/SecurityLayout',
    routes: v1Routes,
  },

  // {
  //   path: '/',
  //   component: '@/layout/SecurityLayout',
  //   routes: defaultRoutes,
  // },
];
