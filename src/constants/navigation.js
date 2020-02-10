export default {
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
      url: '/admin/banking',
      icon: 'fas fa-credit-card',
    },
    {
      name: 'Analytics',
      url: '/admin/revenue',
      icon: 'fas fa-area-chart',
      children: [
        {
          name: 'Users',
          url: '/admin/settings/user',
        },
        {
          name: 'Organization',
          url: '/admin/settings/organization',
        }
      ]
    },
    {
      name: 'Coupons',
      url: '/admin/expense',
      icon: 'fa fa-tags',
    },
    {
      name: 'Queries',
      url: '/admin/taxes',
      icon: 'fas fa-question-circle',
    },
    {
      name: 'Feedback',
      url: '/admin/report',
      icon: "fa fa-commenting",
    },
    {
      name: 'Blacklist',
      url: '/admin/master',
      icon: 'fas fa-ban',
    },
    {
      name: 'Developer',
      url: '/admin/settings',
      icon: 'fas fa-code',
      children: [
        {
          name: 'Users',
          url: '/admin/settings/user',
        },
        {
          name: 'Organization',
          url: '/admin/settings/organization',
        }
      ]
    },
    {
      name: 'Pages',
      url: '/admin/settings',
      icon: 'fa fa-file',
    }
  ]
}
