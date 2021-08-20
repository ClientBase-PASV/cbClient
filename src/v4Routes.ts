const v4Routes = [
  // USER
  {
    path: '/v4/user',
    component: '@/layout/v4/LoginLayout',
    routes: [
      {
        path: '/v4/user/password/reset/request',
        component: '@/pages/v4/user/account/UserPasswordReset',
      },
      {
        path: '/v4/user/password/reset/mailed',
        component: '@/pages/v4/user/account/UserPasswordResetMailed',
      },
      {
        path: '/v4/user/password/reset/:userId/:hash',
        component: '@/pages/v4/user/account/UserPasswordResetNew',
      },
      { path: '/v4/user/login', component: '@/pages/v4/user/account/UserLogin' },
      {
        path: '/v4/user/register',
        component: '@/pages/v4/user/account/UserRegister',
      },
      {
        path: '/v4/user/verify/email/:userId/:hash',
        component: '@/pages/v4/user/account/UserEmailVerify',
      },
    ],
  },

  {
    path: '/v4/',
    component: '@/layout/v4/GeneralLayout',
    routes: [
      {
        path: '/v4/onboarding',
        component: '@/pages/v4/user/onboarding/Onboarding',
      },

      {
        path: '/v4/profile/:userId',
        component: '@/pages/v4/user/profile/UserProfile',
      },

      { path: '/v4/base', component: '@/pages/base/dashboard/BaseDashboard' },
      { path: '/v4/base/:baseId', component: '@/pages/base/view/BaseView' },

      {
        path: '/v4/client',
        component: '@/pages/v4/client/dashboard/ClientDashboard',
      },
      {
        path: '/v4/client/:clientId',
        component: '@/pages/v4/client/view/ClientView',
      },

      { path: '/v4/order', component: '@/pages/v4/order/dashboard/OrderDashboard' },
      { path: '/v4/order/:orderId', component: '@/pages/v4/order/view/OrderView' },

      {
        path: '/v4/vendor',
        component: '@/pages/v4/vendor/dashboard/VendorDashboard',
      },
      {
        path: '/v4/vendor/:vendorId',
        component: '@/pages/v4/vendor/view/VendorView',
      },

      {
        path: '/v4/service',
        component: '@/pages/v4/service/dashboard/ServiceDashboard',
      },
      {
        path: '/v4/service/:serviceId',
        component: '@/pages/v4/service/view/ServiceView',
      },

      { path: '/v4/report', component: '@/pages/v4/report/ReportDashboard' },
      // *****  ====================================

      { path: '/v4/users', component: '@/pages/v4/user/userSearch/UsersDashboard' },
      { path: '/v4/contact', component: '@/pages/v4/staticPages/ContactPage' },
      { path: '/v4/pricing', component: '@/pages/v4/staticPages/PricingPage' },
      { path: '/v4/industries', component: '@/pages/v4/staticPages/IndustriesPage' },
      { path: '/v4/support', component: '@/pages/v4/staticPages/supportPage/Support' },
      { path: '/v4/faq', component: '@/pages/v4/staticPages/Faq' },
      { path: '/v4/subscribe', component: '@/pages/v4/staticPages/Subscribe' },
      {
        path: '/v4/settings/:userId',
        component: '@/layout/v4/UserSettingsLayout',
        routes: [
          {
            path: '/v4/settings/:userId',
            redirect: '/v4/settings/companyAccount/:userId',
          },
          {
            path: '/v4/settings/profile/:userId',
            component: '@/pages/v4/user/settings/profile/UserSettingsEditProfileWrapper',
          },
          {
            path: '/v4/settings/security/:userId',
            component: '@/pages/v4/user/settings/security/UserSettingsEditSecurityWrapper',
          },
          {
            path: '/v4/settings/emails/:userId',
            component: '@/pages/v4/user/settings/emails/UserSettingsEditEmailsWrapper',
          },
          {
            path: '/v4/settings/links/:userId',
            component: '@/pages/v4/user/settings/links/UserSettingsEditLinksWrapper',
          },
        ],
      },

      { path: '/v4/', component: '@/pages/v4/staticPages/home/HomePage' },
    ],
  },
];

export default v4Routes;
