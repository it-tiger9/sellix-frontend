import {
    Contact,
    ShopProducts,
    ShopFeedback,
    LeaveFeedback,
    ShopProductDetail
  } from 'screens'
  
  const shopRoutes = [

    {
      path: '/shop/contact',
      name: 'Contact',
      component: Contact.screen
    },
    {
      path: '/shop/feedback/:id',
      name: 'Leave Feedback',
      component: LeaveFeedback.screen
    },

    {
      path: '/shop/feedback',
      name: 'Feedback',
      component: ShopFeedback.screen
    },

    {
      path: '/shop/products',
      name: 'Products',
      component: ShopProducts.screen
    },
  

    {
      redirect: true,
      path: '/shop',
      pathTo: '/shop/products',
      name: 'Shop'
    }
  ]
  
  export default shopRoutes