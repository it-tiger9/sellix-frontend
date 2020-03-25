import {
    Contact,
    ShopProducts,
    ShopFeedback,
    LeaveFeedback,
    ShopProductDetail
  } from 'screens'


  const user = window.localStorage.getItem('userId')
  
  const shopRoutes = [

    {
      path: `/${user}/shop/contact`,
      name: 'Contact',
      component: Contact.screen
    },
    {
      path: `/${user}/shop/feedback/:id`,
      name: 'Leave Feedback',
      component: LeaveFeedback.screen
    },

    {
      path: `/${user}/shop/feedback`,
      name: 'Feedback',
      component: ShopFeedback.screen
    },

    {
      path: `/${user}/shop/products`,
      name: 'Products',
      component: ShopProducts.screen
    },
  
    {
      redirect: true,
      path: `/${user}/shop`,
      pathTo: `/${user}/shop/products`,
      name: 'Shop'
    }
  ]
  
  export default shopRoutes