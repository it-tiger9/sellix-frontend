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
      path: '/payment/bitcoin',
      name: 'Bitcoin',
      component: BitcoinPaying.screen
    },
    {
      path: '/payment/checkout',
      name: 'ShopProductDetail',
      component: ShopProductDetail.screen
    },
    
  ]
  
  export default paymentRoutes