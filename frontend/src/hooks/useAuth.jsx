import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import userReq from './../api/userReq';
import PropTypes from 'prop-types';
import Loader from '../UI/Loader/Loader';
import getCookie from '../helpers/getCsrfToken';
import { localStorageService } from './../service/localStorage.service';
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const signUp = async (form) => {
    setLoading(false);
    localStorage.setItem('signUp', JSON.stringify(form));
    const { response } = await userReq.create(form);
    if (response && response?.status !== 200) {
      setErrors((prevState) => ({ ...prevState, ...response?.data?.message }));
    } else {
      navigate('/');
      localStorage.clear();
    }
    setLoading(true);
  };
  const signIn = async (form) => {
    setLoading(false);
    const response = await userReq.auth(form);
    console.log(response);
    if (response) {
      navigate('/');
    }
    setLoading(true);
  };
  const logout = async () => {
    localStorageService.removeAllAuth();
    const csrftoken = getCookie('csrftoken');
    await userReq.logout(csrftoken);
    window.location.reload();
  };
  return (
    <AuthContext.Provider value={{ signUp, signIn, logout, errors }}>
      {isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
