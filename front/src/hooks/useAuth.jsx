import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import userReq from './../api/userReq';
import PropTypes from 'prop-types';
import Loader from '../ui/Loader/Loader';
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const signUp = (form) => {
    setLoading(false);
    localStorage.setItem('signUp', JSON.stringify(form));
    userReq.create(form).then((data) => {
      if (data) {
        navigate('/');
        setLoading(true);
        localStorage.clear();
      } else setLoading(true);
    });
  };
  const signIn = (form) => {
    setLoading(false);
    userReq.auth(form).then((data) => {
      if (data) {
        navigate('/');
        setLoading(true);
      } else setLoading(true);
    });
  };
  return (
    <AuthContext.Provider value={{ signUp, signIn }}>
      {isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
