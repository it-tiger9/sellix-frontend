const user = window.localStorage.getItem('userId')

export let mainNavigation =  {
  items: [
    {
      name: 'Dashboard',
      url: `/sellix/${user}/dashboard`,
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Products',
      url: `/sellix/${user}/products`,
      icon: 'fas fa-boxes',
      children: [
        {
          name: 'All Products',
          url: `/sellix/${user}/products/all`
        },
        {
          name: 'Categories',
          url: `/sellix/${user}/products/categories`,
        },
        {
          name: 'Sort Products',
          url: `/sellix/${user}/products/sort-products`,
        },
        {
          name: 'Sort Categories',
          url: `/sellix/${user}/products/sort-categories`,
        }
      ]
    },
    {
      name: 'Orders',
      url: `/sellix/${user}/orders`,
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: `/sellix/${user}/analytics`,
      icon: 'fas fa-area-chart',
      children: [
        {
          name: 'All Analytics',
          url: `/sellix/${user}/analytics/all`,
        },
        {
          name: 'Reports',
          url: `/sellix/${user}/analytics/reports`,
        },
      ]
    },
    {
      name: 'Coupons',
      url: `/sellix/${user}/coupons`,
      icon: 'fa fa-tags',
    },
    {
      name: 'Queries',
      url: `/sellix/${user}/queries`,
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: `/sellix/${user}/feedback`,
      icon: "fa fa-commenting",
    },
    {
      name: 'Blacklist',
      url: `/sellix/${user}/blacklist`,
      icon: 'fas fa-ban',
    },
    {
      name: 'Developer',
      url: `/sellix/${user}/developer`,
      icon: 'fas fa-code',
      children: [
        {
          name: 'Webhooks',
          url: `/sellix/${user}/developer/webhooks`,
        },
        {
          name: 'Webhook Logs',
          url: `/sellix/${user}/developer/webhook-logos`,
        }
      ]
    },
    {
      name: 'Pages',
      url: `/sellix/${user}/pages`,
      icon: 'fa fa-file',
    }
  ]
}


export const accountSettingsNavigation =  {
  items: [
    {
      name: 'General',
      url: `/sellix/${user}/settings/general`
    },
    {
      name: 'Security',
      url: `/sellix/${user}/settings/security`
    },
    {
      name: 'Notifications',
      url: `/sellix/${user}/settings/notifications`
    }
  ]
}


export const shopSettingsNavigation =  {
  items: [
    {
      name: 'Members',
      url: `/sellix/${user}/settings/memebers`
    },
    {
      name: 'Payments',
      url: `/sellix/${user}/settings/payments`
    },
    {
      name: 'Billing',
      url: `/sellix/${user}/settings/billing`
    },
    {
      name: 'Customization',
      url: `/sellix/${user}/settings/customization`
    }
  ]
}

