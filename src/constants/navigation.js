export const mainNavigation =  {
  items: [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'fas fa-home fa-lg'
    },
    {
      name: 'Products',
      url: '/admin/product',
      icon: 'fas fa-boxes',
      children: [
        {
          name: 'All Products',
          url: '/admin/product/all',
          isOpen: true
        },
        {
          name: 'Categories',
          url: '/admin/product/categories',
        },
        {
          name: 'Sort Products',
          url: '/admin/product/product-sort',
        },
        {
          name: 'Sort Categories',
          url: '/admin/product/sort-category',
        }
      ]
    },
    {
      name: 'Orders',
      url: '/admin/orders',
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: '/admin/analytics',
      icon: 'fas fa-area-chart',
      children: [
        {
          name: 'All Analytics',
          url: '/admin/analytics/all',
        },
        {
          name: 'Reports',
          url: '/admin/analytics/reports',
        },
      ]
    },
    {
      name: 'Coupons',
      url: '/admin/coupons',
      icon: 'fa fa-tags',
    },
    {
      name: 'Queries',
      url: '/admin/queries',
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: '/admin/feedback',
      icon: "fa fa-commenting",
    },
    {
      name: 'Blacklist',
      url: '/admin/master',
      icon: 'fas fa-ban',
    },
    {
      name: 'Developer',
      url: '/admin/developer',
      icon: 'fas fa-code',
      children: [
        {
          name: 'Webhooks',
          url: '/admin/developer/webhooks',
        },
        {
          name: 'Webhook Logs',
          url: '/admin/developer/webhook-logs',
        }
      ]
    },
    {
      name: 'Pages',
      url: '/admin/pages',
      icon: 'fa fa-file',
    }
  ]
}


export const accountSettingsNavigation =  {
  items: [
    {
      name: 'General',
      url: '/admin/settings',
    },
    {
      name: 'Security',
      url: '/admin/settings/security',
    },
    {
      name: 'Notifications',
      url: '/admin/settings/notifications',
    }
  ]
}


export const shopSettingsNavigation =  {
  items: [
    {
      name: 'Members',
      url: '/admin/settings/memebers',
    },
    {
      name: 'Payments',
      url: '/admin/settings/payments',
    },
    {
      name: 'Billing',
      url: '/admin/settings/billing',
    },
    {
      name: 'Customization',
      url: '/admin/settings/customizatoin',
    }
  ]
}

