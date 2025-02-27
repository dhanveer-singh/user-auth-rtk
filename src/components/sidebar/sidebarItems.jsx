import { Dashboard, Settings, Group } from '@mui/icons-material';

import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';

const getSidebarItems = (t) => [
  {
    title: t('sidebar.dashboard'),
    icon: <Dashboard />,
    path: FRONTEND_ROUTES?.DASHBOARD,
  },
  { title: t('sidebar.users'), icon: <Group />, path: FRONTEND_ROUTES?.USERS },
  {
    title: t('sidebar.settings'),
    icon: <Settings />,
    children: [
      { title: t('sidebar.account'), path: FRONTEND_ROUTES?.ROOT_PATH },
      { title: t('sidebar.security'), path: FRONTEND_ROUTES?.ROOT_PATH },
    ],
  },
];

export default getSidebarItems;
