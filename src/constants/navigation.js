const user = window.localStorage.getItem('userId')

export let mainNavigation =  {
  items: [
    {
      name: 'Dashboard',
      url: `/dashboard/${user}/home`,
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Products',
      url: `/dashboard/${user}`,
      icon: 'fas fa-boxes',
      children: [
        {
          name: 'All Products',
          url: `/dashboard/${user}/products/all`
        },
        {
          name: 'Categories',
          url: `/dashboard/${user}/products/categories`,
        },
        // {
        //   name: 'Sort Products',
        //   url: `/dashboard/${user}/products/sort-products`,
        // },
        // {
        //   name: 'Sort Categories',
        //   url: `/dashboard/${user}/products/sort-categories`,
        // }
      ]
    },
    {
      name: 'Orders',
      url: `/dashboard/${user}/orders`,
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: `/dashboard/${user}/analytics`,
      icon: 'fas fa-area-chart',
      children: [
        {
          name: 'All Analytics',
          url: `/dashboard/${user}/analytics/stats`,
        },
        {
          name: 'Reports',
          url: `/dashboard/${user}/analytics/reports`,
        },
      ]
    },
    {
      name: 'Coupons',
      url: `/dashboard/${user}/coupons`,
      icon: 'fa fa-tags',
    },
    {
      name: 'Queries',
      url: `/dashboard/${user}/queries`,
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: `/dashboard/${user}/feedback`,
      icon: "fa fa-commenting",
    },
    {
      name: 'Blacklist',
      url: `/dashboard/${user}/blacklist`,
      icon: 'fas fa-ban',
    },
    // {
    //   name: 'Developer',
    //   url: `/dashboard/${user}/developer`,
    //   icon: 'fas fa-code',
    //   children: [
    //     {
    //       name: 'Webhooks',
    //       url: `/dashboard/${user}/developer/webhooks`,
    //     },
    //     {
    //       name: 'Webhook Logs',
    //       url: `/dashboard/${user}/developer/webhook-logos`,
    //     }
    //   ]
    // },
    // {
    //   name: 'Pages',
    //   url: `/dashboard/${user}/pages`,
    //   icon: 'fa fa-file',
    // }
  ]
}


export const accountSettingsNavigation =  {
  items: [
    {
      name: 'General',
      url: `/settings/general`
    },
    {
      name: 'Security',
      url: `/settings/security`
    },
    {
      name: 'Notifications',
      url: `/settings/notifications`
    }
  ]
}


export const shopSettingsNavigation =  {
  items: [
    // {
    //   name: 'Members',
    //   url: `/dashboard/${user}/settings/memebers`
    // },
    {
      name: 'Payments',
      url: `/settings/payments`
    },
    // {
    //   name: 'Billing',
    //   url: `/dashboard/${user}/settings/billing`
    // },
    // {
    //   name: 'Customization',
    //   url: `/dashboard/${user}/settings/customization`
    // }
  ]
}

