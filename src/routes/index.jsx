import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import AuthLayout from '@/components/layouts/adminLayout/authLayout';
import MainLayout from '@/components/layouts/adminLayout/mainLayout';
import ForgotPassword from '@/pages/auth/forgotPassword';
import Signup from '@/pages/auth/signup/signup';
import Dashboard from '@/pages/dashboard/dashboard';
import GoogleMapScreen from '@/pages/googleMap';
import Error404 from '@/pages/maintenance/Error404';
import Profile from '@/pages/profile';
import Users from '@/pages/users/users';
import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';
import PrivateRoute from '@/utils/route-guard/privateRoutes';

const AppRoutes = createBrowserRouter([
  {
    // Redirect from '/' to '/auth/signin'
    path: FRONTEND_ROUTES?.ROOT_PATH,
    element: <Navigate to={FRONTEND_ROUTES?.AUTH?.SIGNIN} />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: FRONTEND_ROUTES?.AUTH?.SIGNIN,
        element: <App />,
      },
      {
        path: FRONTEND_ROUTES?.AUTH?.SIGNUP,
        element: <Signup />,
      },
      {
        path: FRONTEND_ROUTES?.AUTH?.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: FRONTEND_ROUTES?.ROOT_PATH,
    element: <MainLayout />,
    children: [
      {
        path: FRONTEND_ROUTES?.DASHBOARD,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: FRONTEND_ROUTES?.USERS,
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: FRONTEND_ROUTES?.GOOGLE_MAP,
        element: (
          <PrivateRoute>
            <GoogleMapScreen />
          </PrivateRoute>
        ),
      },
      {
        path: FRONTEND_ROUTES?.PROFILE,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);
export default AppRoutes;
