import v1Routes from './v1Routes';
import v2Routes from './v2Routes';
import v3Routes from './v3Routes';
import v4Routes from './v4Routes';

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
    path: '/v3',
    component: '@/layout/v3/SecurityLayout',
    routes: v3Routes,
  },

  {
    path: '/v4',
    component: '@/layout/v4/SecurityLayout',
    routes: v4Routes,
  },

  {
    path: '/email',
    component: '@/pages/email/dashboard/EmailDashboard'
  },

  {
    path: '/',
    redirect: '/v1',
  },
];
