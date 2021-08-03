const defaultRoutes = [
  {
    path: '/',
    component: '@/layout/v1/SecurityLayout',

    routes: [
      // USER
      {
        path: '/user',
        component: '@/layout/LoginLayout',
        routes: [
          { path: '/user/password/reset/request', component: '@/pages/v1/user/account/UserPasswordReset' },
          { path: '/user/password/reset/mailed', component: '@/pages/v1/user/account/UserPasswordResetMailed' },
          { path: '/user/password/reset/:userId/:hash', component: '@/pages/v1/user/account/UserPasswordResetNew' },
          { path: '/user/login', component: '@/pages/v1/user/account/UserLogin' },
          { path: '/user/register', component: '@/pages/v1/user/account/UserRegister' },
          { path: '/user/verify/email/:userId/:hash', component: '@/pages/v1/user/account/UserEmailVerify' },
        ],
      },

      {
        path: '/',
        component: '@/layout/GeneralLayout',
        routes: [
          { path: '/profile/:userId', component: '@/pages/v1/user/profile/UserProfile' },

          { path: '/base', component: '@/pages/v1/base/dashboard/BaseDashboard' },
          { path: '/base/:baseId', component: '@/pages/v1/base/view/BaseView' },

          { path: '/client', component: '@/pages/v1/client/dashboard/ClientDashboard' },
          { path: '/client/:clientId', component: '@/pages/v1/client/view/ClientView' },

          { path: '/order', component: '@/pages/v1/order/dashboard/OrderDashboard' },
          { path: '/order/:orderId', component: '@/pages/v1/order/view/OrderView' },

          { path: '/vendor', component: '@/pages/v1/vendor/dashboard/VendorDashboard' },
          { path: '/vendor/:vendorId', component: '@/pages/v1/vendor/view/VendorView' },

          { path: '/service', component: '@/pages/м1.service/dashboard/ServiceDashboard' },
          { path: '/service/:serviceId', component: '@/pages/м1.service/view/ServiceView' },

          // *****  ====================================
          { path: '/users', component: '@/pages/м1.user/userSearch/UsersDashboard' },
          { path: '/contact', component: '@/v1/staticPages/ContactPage' },
          { path: '/pricing', component: '@/v1/staticPages/PricingPage' },
          { path: '/industries', component: '@/v1/staticPages/IndustriesPage' },
          { path: '/support', component: '@/v1/staticPages/supportPage/Support' },
          { path: '/faq', component: '@/v1/staticPages/Faq' },
          { path: '/subscribe', component: '@/v1/staticPages/Subscribe' },
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
                component: '@/pages/м1.user/settings/profile/UserSettingsEditProfileWrapper',
              },
              {
                path: '/settings/security/:userId',
                component: '@/pages/м1.user/settings/security/UserSettingsEditSecurityWrapper',
              },
              {
                path: '/settings/emails/:userId',
                component: '@/pages/м1.user/settings/emails/UserSettingsEditEmailsWrapper',
              },
              {
                path: '/settings/links/:userId',
                component: '@/pages/м1.user/settings/links/UserSettingsEditLinksWrapper',
              },
            ],
          },

          { path: '/', component: '@/v1/staticPages/home/HomePage' },
        ],
      },
    ],
  },
];

export default defaultRoutes;
