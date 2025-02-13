// src/data/sidebarItems.js
import { Dashboard, Settings, Group } from '@mui/icons-material';

const sidebarItems = [
  { title: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { title: 'Users', icon: <Group />, path: '/users' },
  {
    title: 'Settings',
    icon: <Settings />,
    children: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Security', path: '/settings/security' },
    ],
  },
];

export default sidebarItems;
