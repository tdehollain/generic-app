import { History, Receipt } from 'lucide-react';

const modules = [
  {
    title: 'Time Machine',
    url: '/timemachine',
    icon: History,
    isActive: true,
    items: [
      {
        title: 'Manage',
        url: '/timemachine/manage',
      },
      {
        title: 'Explorer',
        url: '/timemachine/explorer',
      },
      {
        title: 'Prices',
        url: '/timemachine/prices',
      },
    ],
  },
  {
    title: 'Sales Analytics',
    url: '/sales-analytics',
    icon: Receipt,
    isActive: true,
    items: [
      {
        title: 'Sales',
        url: '/sales-analytics/sales',
      },
      {
        title: 'Sales by SOR',
        url: '/sales-analytics/sales-by-sor',
      },
    ],
  },
];

export default modules;
