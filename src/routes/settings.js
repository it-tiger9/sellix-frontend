import {
    SecurityPage,
    Notification,
    Payments,
    MemberPage,
    Billings,
    GeneralSettings,
    Customization
  } from 'screens'

  const user = window.localStorage.getItem('userId')
  
  const settingsRoute = [
    {
      path: `/${user}/settings/general`,
      name: 'GeneralSettings',
      component: GeneralSettings.screen
    },
    {
      path: `/${user}/settings/security`,
      name: 'Security',
      component: SecurityPage.screen
    },
    {
        path: `/${user}/settings/notifications`,
        name: 'Notifications',
        component: Notification.screen
    },

    {
        path: `/${user}/settings/payments`,
        name: 'Payments',
        component: Payments.screen
    },

    // {
    //     path: `/${user}/settings/memebers`,
    //     name: 'Memebers',
    //     component: MemberPage.screen
    // },
    // {
    //   path: `/${user}/settings/billing`,
    //   name: 'Billings',
    //   component: Billings.screen
    // },
    // {
    //   path: `/${user}/settings/customization`,
    //   name: 'Customization',
    //   component: Customization.screen
    // },
    {
      redirect: true,
      pathTo: `/${user}/settings/general`,
      path: `/${user}/settings`,
      name: 'GeneralSettings',
    },
  ]
  
  export default settingsRoute