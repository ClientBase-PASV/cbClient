const v2Routes = [
  // USER
  {
    path: '/v2/user',
    component: '@/layout/v2/LoginLayout',
    routes: [
      {
        path: '/v2/user/password/reset/request',
        component: '@/pages/v2/user/account/UserPasswordReset',
      },
      {
        path: '/v2/user/password/reset/mailed',
        component: '@/pages/v2/user/account/UserPasswordResetMailed',
      },
      {
        path: '/v2/user/password/reset/:userId/:hash',
        component: '@/pages/v2/user/account/UserPasswordResetNew',
      },
      { path: '/v2/user/login', component: '@/pages/v2/user/account/UserLogin' },
      {
        path: '/v2/user/register',
        component: '@/pages/v2/user/account/UserRegister',
      },
      {
        path: '/v2/user/verify/email/:userId/:hash',
        component: '@/pages/v2/user/account/UserEmailVerify',
      },
    ],
  },

  {
    path: '/v2/',
    component: '@/layout/v2/GeneralLayout',
    routes: [
      {
        path: '/v2/onboarding',
        component: '@/pages/v2/user/onboarding/Onboarding',
      },

      {
        path: '/v2/profile/:userId',
        component: '@/pages/v2/user/profile/UserProfile',
      },

      { path: '/v2/base', component: '@/pages/base/dashboard/BaseDashboard' },
      { path: '/v2/base/:baseId', component: '@/pages/base/view/BaseView' },

      {
        path: '/v2/client',
        component: '@/pages/v2/client/dashboard/ClientDashboard',
      },
      {
        path: '/v2/client/:clientId',
        component: '@/pages/v2/client/view/ClientView',
      },

      { path: '/v2/order', component: '@/pages/v2/order/dashboard/OrderDashboard' },
      { path: '/v2/order/:orderId', component: '@/pages/v2/order/view/OrderView' },

      {
        path: '/v2/vendor',
        component: '@/pages/v2/vendor/dashboard/VendorDashboard',
      },
      {
        path: '/v2/vendor/:vendorId',
        component: '@/pages/v2/vendor/view/VendorView',
      },

      {
        path: '/v2/service',
        component: '@/pages/v2/service/dashboard/ServiceDashboard',
      },
      {
        path: '/v2/service/:serviceId',
        component: '@/pages/v2/service/view/ServiceView',
      },

      // *****  ====================================
      { path: '/v2/users', component: '@/pages/v2/user/userSearch/UsersDashboard' },
      { path: '/v2/contact', component: '@/pages/v2/staticPages/ContactPage' },
      { path: '/v2/pricing', component: '@/pages/v2/staticPages/PricingPage' },
      { path: '/v2/industries', component: '@/pages/v2/staticPages/IndustriesPage' },
      { path: '/v2/support', component: '@/pages/v2/staticPages/supportPage/Support' },
      { path: '/v2/faq', component: '@/pages/v2/staticPages/Faq' },
      { path: '/v2/subscribe', component: '@/pages/v2/staticPages/Subscribe' },
      {
        path: '/v2/settings/:userId',
        component: '@/layout/v2/UserSettingsLayout',
        routes: [
          {
            path: '/v2/settings/:userId',
            redirect: '/v2/settings/companyAccount/:userId',
          },
          {
            path: '/v2/settings/profile/:userId',
            component: '@/pages/v2/user/settings/profile/UserSettingsEditProfileWrapper',
          },
          {
            path: '/v2/settings/security/:userId',
            component: '@/pages/v2/user/settings/security/UserSettingsEditSecurityWrapper',
          },
          {
            path: '/v2/settings/emails/:userId',
            component: '@/pages/v2/user/settings/emails/UserSettingsEditEmailsWrapper',
          },
          {
            path: '/v2/settings/links/:userId',
            component: '@/pages/v2/user/settings/links/UserSettingsEditLinksWrapper',
          },
        ],
      },

      { path: '/v2/', component: '@/pages/v2/staticPages/home/HomePage' },
    ],
  },
];

export default v2Routes;
