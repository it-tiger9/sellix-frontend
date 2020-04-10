const user = window.localStorage.getItem('userId')

export const mainNavigation =  {
  items: [
    {
      name: 'Dashboard',
      url: `/dashboard/home`,
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Products',
      url: `/dashboard/products`,
      icon: 'fas fa-boxes',
      children: [
        {
          name: 'All Products',
          url: `/dashboard/products/all`
        },
        {
          name: 'Categories',
          url: `/dashboard/products/categories`,
        },
        // {
        //   name: 'Sort Products',
        //   url: `/dashboard/products/sort-products`,
        // },
        // {
        //   name: 'Sort Categories',
        //   url: `/dashboard/products/sort-categories`,
        // }
      ]
    },
    {
      name: 'Orders',
      url: `/dashboard/orders`,
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: `/dashboard/analytics`,
      icon: 'fas fa-area-chart',
      children: [
        {
          name: 'All Analytics',
          url: `/dashboard/analytics/all`,
        },
        {
          name: 'Reports',
          url: `/dashboard/analytics/reports`,
        },
      ]
    },
    {
      name: 'Coupons',
      url: `/dashboard/coupons`,
      icon: 'fa fa-tags',
    },
    {
      name: 'Queries',
      url: `/dashboard/queries`,
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: `/dashboard/feedback`,
      icon: "fa fa-commenting",
    },
    {
      name: 'Blacklist',
      url: `/dashboard/blacklist`,
      icon: 'fas fa-ban',
    },
    // {
    //   name: 'Developer',
    //   url: `/dashboard/developer`,
    //   icon: 'fas fa-code',
    //   children: [
    //     {
    //       name: 'Webhooks',
    //       url: `/dashboard/developer/webhooks`,
    //     },
    //     {
    //       name: 'Webhook Logs',
    //       url: `/dashboard/developer/webhook-logos`,
    //     }
    //   ]
    // },
    {
      name: 'Pages',
      url: `/dashboard/pages`,
      icon: 'fa fa-file',
    }
  ]
}

export const adminNavigation =  {
  items: [
    {
      name: 'Dashboard',
      url: `/dashboard/home`,
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Users',
      url: `/dashboard/products`,
      icon: 'fas fa-boxes',
    },
    {
      name: 'Top 10 users',
      url: `/dashboard/orders`,
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: `/dashboard/analytics`,
      icon: 'fas fa-area-chart',
      children: [
        {
          name: 'All Analytics',
          url: `/dashboard/analytics/all`,
        },
        {
          name: 'Reports',
          url: `/dashboard/analytics/reports`,
        },
      ]
    },
    {
      name: 'Coupons',
      url: `/dashboard/coupons`,
      icon: 'fa fa-tags',
    },
    {
      name: 'Queries',
      url: `/dashboard/queries`,
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: `/dashboard/feedback`,
      icon: "fa fa-commenting",
    },
    {
      name: 'Blacklist',
      url: `/dashboard/blacklist`,
      icon: 'fas fa-ban',
    },
    // {
    //   name: 'Developer',
    //   url: `/dashboard/developer`,
    //   icon: 'fas fa-code',
    //   children: [
    //     {
    //       name: 'Webhooks',
    //       url: `/dashboard/developer/webhooks`,
    //     },
    //     {
    //       name: 'Webhook Logs',
    //       url: `/dashboard/developer/webhook-logos`,
    //     }
    //   ]
    // },
    {
      name: 'Pages',
      url: `/dashboard/pages`,
      icon: 'fa fa-file',
    }
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
    //   url: `/dashboard/settings/memebers`
    // },
    {
      name: 'Payments',
      url: `/settings/payments`
    },
    // {
    //   name: 'Billing',
    //   url: `/dashboard/settings/billing`
    // },
    // {
    //   name: 'Customization',
    //   url: `/dashboard/settings/customization`
    // }
  ]
}

