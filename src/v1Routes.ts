const v1Routes = [
  // USER
  {
    path: '/v1/user',
    component: '@/layout/v1/LoginLayout',
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
    component: '@/layout/v1/GeneralLayout',
    routes: [
      {
        path: '/v1/onboarding',
        component: '@/pages/v1/user/onboarding/Onboarding',
      },

      {
        path: '/v1/profile/:userId',
        component: '@/pages/v1/user/profile/UserProfile',
      },

      { path: '/v1/base', component: '@/pages/base/dashboard/BaseDashboard' },
      { path: '/v1/base/:baseId', component: '@/pages/base/view/BaseView' },

      {
        path: '/v1/client',
        component: '@/pages/v1/client/dashboard/ClientDashboard',
      },
      {
        path: '/v1/client/:clientId',
        component: '@/pages/v1/client/view/ClientView',
      },

      { path: '/v1/order', component: '@/pages/v1/order/dashboard/OrderDashboard' },
      { path: '/v1/order/:orderId', component: '@/pages/v1/order/view/OrderView' },

      {
        path: '/v1/vendor',
        component: '@/pages/v1/vendor/dashboard/VendorDashboard',
      },
      {
        path: '/v1/vendor/:vendorId',
        component: '@/pages/v1/vendor/view/VendorView',
      },

      {
        path: '/v1/service',
        component: '@/pages/v1/service/dashboard/ServiceDashboard',
      },
      {
        path: '/v1/service/:serviceId',
        component: '@/pages/v1/service/view/ServiceView',
      },

      // *****  ====================================
      { path: '/v1/users', component: '@/pages/v1/user/userSearch/UsersDashboard' },
      { path: '/v1/contact', component: '@/pages/v1/staticPages/ContactPage' },
      { path: '/v1/pricing', component: '@/pages/v1/staticPages/PricingPage' },
      { path: '/v1/industries', component: '@/pages/v1/staticPages/IndustriesPage' },
      { path: '/v1/support', component: '@/pages/v1/staticPages/supportPage/Support' },
      { path: '/v1/faq', component: '@/pages/v1/staticPages/Faq' },
      { path: '/v1/subscribe', component: '@/pages/v1/staticPages/Subscribe' },
      {
        path: '/v1/settings/:userId',
        component: '@/layout/v1/UserSettingsLayout',
        routes: [
          {
            path: '/v1/settings/:userId',
            redirect: '/v1/settings/companyAccount/:userId',
          },
          {
            path: '/v1/settings/profile/:userId',
            component: '@/pages/v1/user/settings/profile/UserSettingsEditProfileWrapper',
          },
          {
            path: '/v1/settings/security/:userId',
            component: '@/pages/v1/user/settings/security/UserSettingsEditSecurityWrapper',
          },
          {
            path: '/v1/settings/emails/:userId',
            component: '@/pages/v1/user/settings/emails/UserSettingsEditEmailsWrapper',
          },
          {
            path: '/v1/settings/links/:userId',
            component: '@/pages/v1/user/settings/links/UserSettingsEditLinksWrapper',
          },
        ],
      },

      { path: '/v1/', component: '@/pages/v1/staticPages/home/HomePage' },
    ],
  },
];

export default v1Routes;
