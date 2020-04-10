import {
    PaypalPaying,
    Invoice,
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
      component: Invoice.screen
    },
    {
      path: '/payment/checkout/:id',
      name: 'ShopProductDetail',
      component: ShopProductDetail.screen
    }
  ]
  
  export default paymentRoutes