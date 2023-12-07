import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Login = lazy(() => import('./../pages/login/login'));
const Main = lazy(() => import('../pages/main/main'));
const NotFound = lazy(() => import('./../pages/notFound/notFound'));
const Registration = lazy(() => import('../pages/registration/registration'));
const Restore = lazy(() => import('../pages/restore/restore'));

const AppRoutes = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '/signUp',
      element: <Registration />
    },
    {
      path: '/restore',
      element: <Restore />
    }
  ]);
  return elements;
};

export default AppRoutes;
