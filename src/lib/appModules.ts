import { History } from 'lucide-react';

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
];

export default modules;
