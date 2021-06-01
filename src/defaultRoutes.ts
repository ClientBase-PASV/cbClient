const defaultRoutes = [
  {
    path: '/',
    component: '@/layout/SecurityLayout',

    routes: [
      // USER
      {
        path: '/user',
        component: '@/layout/LoginLayout',
        routes: [
          { path: '/user/password/reset/request', component: '@/pages/user/account/UserPasswordReset' },
          { path: '/user/password/reset/mailed', component: '@/pages/user/account/UserPasswordResetMailed' },
          { path: '/user/password/reset/:userId/:hash', component: '@/pages/user/account/UserPasswordResetNew' },
          { path: '/user/login', component: '@/pages/user/account/UserLogin' },
          { path: '/user/register', component: '@/pages/user/account/UserRegister' },
          { path: '/user/verify/email/:userId/:hash', component: '@/pages/user/account/UserEmailVerify' },
        ],
      },

      {
        path: '/',
        component: '@/layout/GeneralLayout',
        routes: [
          { path: '/profile/:userId', component: '@/pages/user/profile/UserProfile' },

          { path: '/base', component: '@/pages/base/dashboard/BaseDashboard' },
          { path: '/base/:baseId', component: '@/pages/base/view/BaseView' },

          { path: '/client', component: '@/pages/client/dashboard/ClientDashboard' },
          { path: '/client/:clientId', component: '@/pages/client/view/ClientView' },

          { path: '/order', component: '@/pages/order/dashboard/OrderDashboard' },
          { path: '/order/:orderId', component: '@/pages/order/view/OrderView' },

          { path: '/vendor', component: '@/pages/vendor/dashboard/VendorDashboard' },
          { path: '/vendor/:vendorId', component: '@/pages/vendor/view/VendorView' },

          { path: '/service', component: '@/pages/service/dashboard/ServiceDashboard' },
          { path: '/service/:serviceId', component: '@/pages/service/view/ServiceView' },

          // *****  ====================================
          { path: '/users', component: '@/pages/user/userSearch/UsersDashboard' },
          { path: '/contact', component: '@/pages/pages/ContactPage' },
          { path: '/pricing', component: '@/pages/pages/PricingPage' },
          { path: '/industries', component: '@/pages/pages/IndustriesPage' },
          { path: '/support', component: '@/pages/pages/supportPage/Support' },
          { path: '/faq', component: '@/pages/pages/Faq' },
          { path: '/subscribe', component: '@/pages/pages/Subscribe' },
          {
            path: '/settings/:userId',
            component: '@/layout/UserSettingsLayout',
            routes: [
              {
                path: '/settings/:userId',
                redirect: '/settings/companyAccount/:userId',
              },
              {
                path: '/settings/profile/:userId',
                component: '@/pages/user/settings/profile/UserSettingsEditProfileWrapper',
              },
              {
                path: '/settings/security/:userId',
                component: '@/pages/user/settings/security/UserSettingsEditSecurityWrapper',
              },
              {
                path: '/settings/emails/:userId',
                component: '@/pages/user/settings/emails/UserSettingsEditEmailsWrapper',
              },
              {
                path: '/settings/links/:userId',
                component: '@/pages/user/settings/links/UserSettingsEditLinksWrapper',
              },
            ],
          },

          { path: '/', component: '@/pages/pages/homePage/HomePage' },
        ],
      },
    ],
  },
];

export default defaultRoutes;
