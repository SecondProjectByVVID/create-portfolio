import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';
import Header from './../header/Header';
import useScrollToTop from '../../hooks/useScrollToTop';
import { createPortal } from 'react-dom';
import ScrollTop from '../scrollTop/ScrollTop';
const Layout = () => {
  const { toTop } = useScrollToTop();
  return (
    <div className="client__bg">
      <Header />
      <Outlet />
      {toTop && createPortal(<ScrollTop />, document.getElementById('to-top'))}
    </div>
  );
};

export default Layout;
