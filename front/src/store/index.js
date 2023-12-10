import { configureStore } from '@reduxjs/toolkit';
import signInReducer from './auth/SignIn';
// import { signUpReducer } from './auth/SignUp';

const reducer = {
  signIn: signInReducer // войти
  // signUp: signUpReducer // зарегестрироваться
};

const store = configureStore({
  reducer,
  devTools: true
});

export default store;
