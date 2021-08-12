import v1Routes from './v1Routes';
import v2Routes from './v2Routes';

export default [
  {
    path: '/v1',
    component: '@/layout/v1/SecurityLayout',
    routes: v1Routes,
  },

  {
    path: '/v2',
    component: '@/layout/v2/SecurityLayout',
    routes: v2Routes,
  },

  {
    path: '/',
    redirect: '/v1',
  },
];
