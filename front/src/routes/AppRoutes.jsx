import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Login = lazy(() => import('../pages/login'));
const Main = lazy(() => import('../pages/main'));
const NotFound = lazy(() => import('../pages/notFound/notFound'));

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
    }
  ]);
  return elements;
};

export default AppRoutes;
