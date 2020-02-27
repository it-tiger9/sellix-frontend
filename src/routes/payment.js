import {
    PaypalPaying
  } from 'screens'
  
  const paymentRoutes = [
    {
      path: '/payment/paypal',
      name: 'PaypalPay',
      component: PaypalPaying.screen
    }
  ]
  
  export default paymentRoutes