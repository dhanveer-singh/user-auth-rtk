import { Dashboard, Settings, Group } from '@mui/icons-material';

import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';

const sidebarItems = [
  { title: 'Dashboard', icon: <Dashboard />, path: FRONTEND_ROUTES.DASHBOARD },
  { title: 'Users', icon: <Group />, path: FRONTEND_ROUTES.USERS },
  {
    title: 'Settings',
    icon: <Settings />,
    children: [
      { title: 'Account', path: FRONTEND_ROUTES.ROOT_PATH },
      { title: 'Security', path: FRONTEND_ROUTES.ROOT_PATH },
    ],
  },
];

export default sidebarItems;
