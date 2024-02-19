import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development';
import AuthProvider from './../hooks/useAuth';

const Login = lazy(() => import('./../pages/login/login'));
const Main = lazy(() => import('../pages/main/main'));
const NotFound = lazy(() => import('../pages/notFound/NotFound'));
const Registration = lazy(() => import('../pages/registration/registration'));
const Restore = lazy(() => import('../pages/restore/restore'));
const Reset = lazy(() => import('../pages/reset/reset'));

const Layout = lazy(() => import('./../components/layout/Layout'));
const ActiveEmail = lazy(() => import('./../pages/activeEmail/ActiveEmail'));

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Main />} />
          <Route path="/user-portfolio" element={<Portfolio />} />
        </Route>
        <Route path="/signUp" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restore" element={<Restore />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/account-activation/:message" element={<ActiveEmail />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
