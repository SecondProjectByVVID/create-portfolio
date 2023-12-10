import { useNavigate, Link } from 'react-router-dom/dist/umd/react-router-dom.development';

import './notFound.scss';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="bg-fon">
        <div className="top">
          <h1 className="h1-title">404</h1>
          <h3 className="h3-title">page not found</h3>
        </div>
        <div className="notfound__container">
          <div className="ghost-copy">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
          </div>
          <div className="ghost">
            <div className="face">
              <div className="eye"></div>
              <div className="eye-right"></div>
              <div className="mouth"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
        <div className="bottom">
          <p className="notfound__text">Boo, looks like a ghost stole this page!</p>
          <div className="buttons">
            <button className="btn" onClick={() => navigate(-1)}>
              Back
            </button>
            <Link to="/">
              <button className="btn">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
