import {
    PaypalPaying,
    BitcoinPaying,
    ShopProductDetail
  } from 'screens'
  
  const paymentRoutes = [
    {
      path: '/payment/paypal',
      name: 'PaypalPay',
      component: PaypalPaying.screen
    },
    {
      path: '/payment/invoice/:id',
      name: 'Bitcoin',
      component: BitcoinPaying.screen
    },
    {
      path: '/payment/checkout/:id',
      name: 'ShopProductDetail',
      component: ShopProductDetail.screen
    },

    {
      path: '/payment',
      name: 'Checkout'
    }
    
  ]
  
  export default paymentRoutes