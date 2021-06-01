const v1Routes = [
  // USER
  {
    path: '/v1/user',
    component: '@/layout/LoginLayout',
    routes: [
      {
        path: '/v1/user/password/reset/request',
        component: '@/pages/v1/user/account/UserPasswordReset',
      },
      {
        path: '/v1/user/password/reset/mailed',
        component: '@/pages/v1/user/account/UserPasswordResetMailed',
      },
      {
        path: '/v1/user/password/reset/:userId/:hash',
        component: '@/pages/v1/user/account/UserPasswordResetNew',
      },
      { path: '/v1/user/login', component: '@/pages/v1/user/account/UserLogin' },
      {
        path: '/v1/user/register',
        component: '@/pages/v1/user/account/UserRegister',
      },
      {
        path: '/v1/user/verify/email/:userId/:hash',
        component: '@/pages/v1/user/account/UserEmailVerify',
      },
    ],
  },

  {
    path: '/v1/',
    component: '@/layout/GeneralLayout',
    routes: [
      {
        path: '/v1/profile/:userId',
        component: '@/pages/user/profile/UserProfile',
      },

      { path: '/v1/base', component: '@/pages/base/dashboard/BaseDashboard' },
      { path: '/v1/base/:baseId', component: '@/pages/base/view/BaseView' },

      {
        path: '/v1/client',
        component: '@/pages/client/dashboard/ClientDashboard',
      },
      {
        path: '/v1/client/:clientId',
        component: '@/pages/client/view/ClientView',
      },

      { path: '/v1/order', component: '@/pages/order/dashboard/OrderDashboard' },
      { path: '/v1/order/:orderId', component: '@/pages/order/view/OrderView' },

      {
        path: '/v1/vendor',
        component: '@/pages/vendor/dashboard/VendorDashboard',
      },
      {
        path: '/v1/vendor/:vendorId',
        component: '@/pages/vendor/view/VendorView',
      },

      {
        path: '/v1/service',
        component: '@/pages/service/dashboard/ServiceDashboard',
      },
      {
        path: '/v1/service/:serviceId',
        component: '@/pages/service/view/ServiceView',
      },

      // *****  ====================================
      { path: '/v1/users', component: '@/pages/user/userSearch/UsersDashboard' },
      { path: '/v1/contact', component: '@/pages/pages/ContactPage' },
      { path: '/v1/pricing', component: '@/pages/pages/PricingPage' },
      { path: '/v1/industries', component: '@/pages/pages/IndustriesPage' },
      { path: '/v1/support', component: '@/pages/pages/supportPage/Support' },
      { path: '/v1/faq', component: '@/pages/pages/Faq' },
      { path: '/v1/subscribe', component: '@/pages/pages/Subscribe' },
      {
        path: '/v1/settings/:userId',
        component: '@/layout/UserSettingsLayout',
        routes: [
          {
            path: '/v1/settings/:userId',
            redirect: '/settings/companyAccount/:userId',
          },
          {
            path: '/v1/settings/profile/:userId',
            component: '@/pages/user/settings/profile/UserSettingsEditProfileWrapper',
          },
          {
            path: '/v1/settings/security/:userId',
            component: '@/pages/user/settings/security/UserSettingsEditSecurityWrapper',
          },
          {
            path: '/v1/settings/emails/:userId',
            component: '@/pages/user/settings/emails/UserSettingsEditEmailsWrapper',
          },
          {
            path: '/v1/settings/links/:userId',
            component: '@/pages/user/settings/links/UserSettingsEditLinksWrapper',
          },
        ],
      },

      { path: '/v1/', component: '@/pages/pages/homePage/HomePage' },
    ],
  },
];

export default v1Routes;
