import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

const rootActions = {};

const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};

export default useActions;
