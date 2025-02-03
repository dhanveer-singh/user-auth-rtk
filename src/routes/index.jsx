import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import NotFound from '@/components/notFound';
import Signup from '@/components/signup';
import AuthLayout from '@/layouts/authLayout';

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />, 
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default AppRoutes;
