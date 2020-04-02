const user = window.localStorage.getItem('userId')

export let mainNavigation =  {
  items: [
    {
      name: 'Dashboard',
      url: `/${user}/dashboard`,
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Products',
      url: `/${user}/products`,
      icon: 'fas fa-boxes',
      children: [
        {
          name: 'All Products',
          url: `/${user}/products/all`
        },
        {
          name: 'Categories',
          url: `/${user}/products/categories`,
        },
        // {
        //   name: 'Sort Products',
        //   url: `/${user}/products/sort-products`,
        // },
        // {
        //   name: 'Sort Categories',
        //   url: `/${user}/products/sort-categories`,
        // }
      ]
    },
    {
      name: 'Orders',
      url: `/${user}/orders`,
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: `/${user}/analytics`,
      icon: 'fas fa-area-chart',
      children: [
        {
          name: 'All Analytics',
          url: `/${user}/analytics/all`,
        },
        {
          name: 'Reports',
          url: `/${user}/analytics/reports`,
        },
      ]
    },
    {
      name: 'Coupons',
      url: `/${user}/coupons`,
      icon: 'fa fa-tags',
    },
    {
      name: 'Queries',
      url: `/${user}/queries`,
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: `/${user}/feedback`,
      icon: "fa fa-commenting",
    },
    {
      name: 'Blacklist',
      url: `/${user}/blacklist`,
      icon: 'fas fa-ban',
    },
    // {
    //   name: 'Developer',
    //   url: `/${user}/developer`,
    //   icon: 'fas fa-code',
    //   children: [
    //     {
    //       name: 'Webhooks',
    //       url: `/${user}/developer/webhooks`,
    //     },
    //     {
    //       name: 'Webhook Logs',
    //       url: `/${user}/developer/webhook-logos`,
    //     }
    //   ]
    // },
    {
      name: 'Pages',
      url: `/${user}/pages`,
      icon: 'fa fa-file',
    }
  ]
}


export const accountSettingsNavigation =  {
  items: [
    {
      name: 'General',
      url: `/${user}/settings/general`
    },
    {
      name: 'Security',
      url: `/${user}/settings/security`
    },
    {
      name: 'Notifications',
      url: `/${user}/settings/notifications`
    }
  ]
}


export const shopSettingsNavigation =  {
  items: [
    {
      name: 'Members',
      url: `/${user}/settings/memebers`
    },
    {
      name: 'Payments',
      url: `/${user}/settings/payments`
    },
    {
      name: 'Billing',
      url: `/${user}/settings/billing`
    },
    {
      name: 'Customization',
      url: `/${user}/settings/customization`
    }
  ]
}

