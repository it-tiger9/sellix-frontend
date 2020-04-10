import {
    Contact,
    Contacts,
    ShopProducts,
    ShopFeedback,
    LeaveFeedback,
    ShopProductDetail
  } from 'screens'


  const user = window.localStorage.getItem('userId')
  
  const shopRoutes = [
    {
      path: `/u/:username/contact/:id`,
      name: 'Contacts',
      component: Contacts
    },
    {
      path: `/u/:username/contact`,
      name: 'Contact',
      component: Contact.screen
    },


    {
      path: `/u/:username/query/:id`,
      name: 'Leave Query',
      component: LeaveFeedback.screen
    },



    {
      path: `/u/:username/feedback/:id`,
      name: 'Leave Feedback',
      component: LeaveFeedback.screen
    },

    {
      path: `/u/:username/feedback`,
      name: 'Feedback',
      component: ShopFeedback.screen
    },



    {
      path: `/u/:username/category/:id`,
      name: 'Products',
      component: ShopProducts.screen
    },

    {
      path: `/u/:username`,
      name: 'Products',
      component: ShopProducts.screen
    },
  ]
  
  export default shopRoutes