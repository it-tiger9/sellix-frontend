import {
    SecurityPage,
    Notification,
    Payments,
    MemberPage,
    Billings,
    GeneralSettings,
    Customization
  } from 'screens'
  
  const settingsRoute = [
    {
      path: '/settings/general',
      name: 'GeneralSettings',
      component: GeneralSettings.screen
    },
    {
      path: '/settings/security',
      name: 'Security',
      component: SecurityPage.screen
    },
    {
        path: '/settings/notifications',
        name: 'Notifications',
        component: Notification.screen
    },

    {
        path: '/settings/payments',
        name: 'Payments',
        component: Payments.screen
    },

    {
        path: '/settings/memebers',
        name: 'Memebers',
        component: MemberPage.screen
    },
    {
      path: '/settings/billing',
      name: 'Billings',
      component: Billings.screen
    },
    {
      path: '/settings/customization',
      name: 'Customization',
      component: Customization.screen
    },
    {
      redirect: true,
      pathTo: '/settings/general',
      path: '/settings',
      name: 'GeneralSettings',
    },
  ]
  
  export default settingsRoute