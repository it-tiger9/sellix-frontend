import {
    Home,
    Fees,
    Terms
  } from 'screens'
  
  const landingRoutes = [
    {
      path: '/fees',
      component: Fees.screen,
      name: 'Fees'
    },
    {
      path: '/terms',
      component: Terms,
      name: 'Terms'
    },
    {
      path: '/',
      component: Home.screen,
      name: 'Home'
    },
  ]
  
  export default landingRoutes