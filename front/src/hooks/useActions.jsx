import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth/SignIn';

const rootActions = { login };

const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};

export default useActions;
