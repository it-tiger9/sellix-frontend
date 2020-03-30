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
      path: `/shop/:username/contact`,
      name: 'Contact',
      component: Contact.screen
    },
    {
      path: `/shop/:username/feedback/:id`,
      name: 'Leave Feedback',
      component: LeaveFeedback.screen
    },

    {
      path: `/shop/:username/feedback`,
      name: 'Feedback',
      component: ShopFeedback.screen
    },

    {
      path: `/shop/:username/products`,
      name: 'Products',
      component: ShopProducts.screen
    },
  
    {
      redirect: true,
      path: `/shop/:username`,
      pathTo: `/shop/:username/products`,
      name: 'Shop'
    }
  ]
  
  export default shopRoutes