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
      path: `/sellix/${user}/settings/general`,
      name: 'GeneralSettings',
      component: GeneralSettings.screen
    },
    {
      path: `/sellix/${user}/settings/security`,
      name: 'Security',
      component: SecurityPage.screen
    },
    {
        path: `/sellix/${user}/settings/notifications`,
        name: 'Notifications',
        component: Notification.screen
    },

    {
        path: `/sellix/${user}/settings/payments`,
        name: 'Payments',
        component: Payments.screen
    },

    {
        path: `/sellix/${user}/settings/memebers`,
        name: 'Memebers',
        component: MemberPage.screen
    },
    {
      path: `/sellix/${user}/settings/billing`,
      name: 'Billings',
      component: Billings.screen
    },
    {
      path: `/sellix/${user}/settings/customization`,
      name: 'Customization',
      component: Customization.screen
    },
    {
      redirect: true,
      pathTo: `/sellix/${user}/settings/general`,
      path: `/sellix/${user}/settings`,
      name: 'GeneralSettings',
    },
  ]
  
  export default settingsRoute