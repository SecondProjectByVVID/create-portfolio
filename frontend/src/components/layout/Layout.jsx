import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';
import Header from './../header/Header';
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
