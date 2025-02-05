import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import NotFound from '@/components/notFound';
import AuthLayout from '@/layouts/authLayout';
import Signup from '@/pages/auth/signup/signup';
import Dashboard from '@/pages/dashboard/dashboard';
import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';
import PrivateRoute from '@/utils/route-guard/privateRoutes';

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: FRONTEND_ROUTES.AUTH.SIGNIN,
        element: <App />,
      },
      {
        path: FRONTEND_ROUTES.AUTH.SIGNUP,
        element: <Signup />,
      },
    ],
  },
  {
    path: FRONTEND_ROUTES.DASHBOARD,
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default AppRoutes;
