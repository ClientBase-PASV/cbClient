const v3Routes = [
  // USER
  {
    path: '/v3/user',
    component: '@/layout/v3/LoginLayout',
    routes: [
      {
        path: '/v3/user/password/reset/request',
        component: '@/pages/v3/user/account/UserPasswordReset',
      },
      {
        path: '/v3/user/password/reset/mailed',
        component: '@/pages/v3/user/account/UserPasswordResetMailed',
      },
      {
        path: '/v3/user/password/reset/:userId/:hash',
        component: '@/pages/v3/user/account/UserPasswordResetNew',
      },
      { path: '/v3/user/login', component: '@/pages/v3/user/account/UserLogin' },
      {
        path: '/v3/user/register',
        component: '@/pages/v3/user/account/UserRegister',
      },
      {
        path: '/v3/user/verify/email/:userId/:hash',
        component: '@/pages/v3/user/account/UserEmailVerify',
      },
    ],
  },

  {
    path: '/v3/',
    component: '@/layout/v3/GeneralLayout',
    routes: [
      {
        path: '/v3/onboarding',
        component: '@/pages/v3/user/onboarding/Onboarding',
      },

      {
        path: '/v3/profile/:userId',
        component: '@/pages/v3/user/profile/UserProfile',
      },

      { path: '/v3/base', component: '@/pages/base/dashboard/BaseDashboard' },
      { path: '/v3/base/:baseId', component: '@/pages/base/view/BaseView' },

      {
        path: '/v3/client',
        component: '@/pages/v3/client/dashboard/ClientDashboard',
      },
      {
        path: '/v3/client/:clientId',
        component: '@/pages/v3/client/view/ClientView',
      },

      { path: '/v3/order', component: '@/pages/v3/order/dashboard/OrderDashboard' },
      { path: '/v3/order/:orderId', component: '@/pages/v3/order/view/OrderView' },

      {
        path: '/v3/vendor',
        component: '@/pages/v3/vendor/dashboard/VendorDashboard',
      },
      {
        path: '/v3/vendor/:vendorId',
        component: '@/pages/v3/vendor/view/VendorView',
      },

      {
        path: '/v3/service',
        component: '@/pages/v3/service/dashboard/ServiceDashboard',
      },
      {
        path: '/v3/service/:serviceId',
        component: '@/pages/v3/service/view/ServiceView',
      },

      { path: '/v3/report', component: '@/pages/v3/report/ReportDashboard' },
      // *****  ====================================

      { path: '/v3/users', component: '@/pages/v3/user/userSearch/UsersDashboard' },
      { path: '/v3/contact', component: '@/pages/v3/staticPages/ContactPage' },
      { path: '/v3/pricing', component: '@/pages/v3/staticPages/PricingPage' },
      { path: '/v3/industries', component: '@/pages/v3/staticPages/IndustriesPage' },
      { path: '/v3/support', component: '@/pages/v3/staticPages/supportPage/Support' },
      { path: '/v3/faq', component: '@/pages/v3/staticPages/Faq' },
      { path: '/v3/subscribe', component: '@/pages/v3/staticPages/Subscribe' },
      {
        path: '/v3/settings/:userId',
        component: '@/layout/v3/UserSettingsLayout',
        routes: [
          {
            path: '/v3/settings/:userId',
            redirect: '/v3/settings/companyAccount/:userId',
          },
          {
            path: '/v3/settings/profile/:userId',
            component: '@/pages/v3/user/settings/profile/UserSettingsEditProfileWrapper',
          },
          {
            path: '/v3/settings/security/:userId',
            component: '@/pages/v3/user/settings/security/UserSettingsEditSecurityWrapper',
          },
          {
            path: '/v3/settings/emails/:userId',
            component: '@/pages/v3/user/settings/emails/UserSettingsEditEmailsWrapper',
          },
          {
            path: '/v3/settings/links/:userId',
            component: '@/pages/v3/user/settings/links/UserSettingsEditLinksWrapper',
          },
        ],
      },

      { path: '/v3/', component: '@/pages/v3/staticPages/home/HomePage' },
    ],
  },
];

export default v3Routes;
