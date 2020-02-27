import {
    Contact,
    ShopProducts,
    ShopFeedback,
    ShopProductDetail
  } from 'screens'
  
  const shopRoutes = [

    {
      path: '/shop/contact',
      name: 'Contact',
      component: Contact.screen
    },
    {
      path: '/shop/feedbacks',
      name: 'Feedback',
      component: ShopFeedback.screen
    },

    {
      path: '/shop/products/detail',
      name: 'ShopProductDetail',
      component: ShopProductDetail.screen
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