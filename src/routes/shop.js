import {
    Dashboard,
    Contact,
    ShopProducts,
    ShopFeedback
  } from 'screens'
  
  const shopRoutes = [
    {
      path: '/shop/products',
      name: 'Products',
      component: ShopProducts.screen
    },
  
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
      redirect: true,
      path: '/shop',
      pathTo: '/shop/products',
      name: 'Shop'
    }
  ]
  
  export default shopRoutes