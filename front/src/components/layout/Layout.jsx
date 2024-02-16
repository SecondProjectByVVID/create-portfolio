import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';
import Header from './../header/Header';
const Layout = () => {
  return (
    <div className="client__bg">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
