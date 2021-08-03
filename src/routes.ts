import v1Routes from './v1Routes';
// import defaultRoutes from './defaultRoutes';

export default [
  {
    path: '/v1',
    component: '@/layout/v1/SecurityLayout',
    routes: v1Routes,
  },

  {
    path: '/',
    redirect: '/v1',
  },
];
