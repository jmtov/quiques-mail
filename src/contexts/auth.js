import React, { useReducer, useEffect } from 'react';

import firebase from 'config/firebase';
import { REQUEST_STATUS } from 'constants/network';
import { ERRORS } from 'constants/firebase';

export const AuthContext = React.createContext();

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGIN_RESET: 'LOGIN_RESET',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

export const reducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.LOGIN:
    return { ...state, loginStatus: REQUEST_STATUS.LOADING };
  case ACTIONS.LOGIN_RESET:
    return { ...state, loginStatus: REQUEST_STATUS.NOT_REQUESTED, loginError: null };
  case ACTIONS.LOGIN_SUCCESS:
    return { ...state, loginStatus: REQUEST_STATUS.DONE };
  case ACTIONS.LOGIN_FAILURE:
    return { ...state, loginStatus: REQUEST_STATUS.ERROR, loginError: action.payload };
  case ACTIONS.SET_CURRENT_USER:
    return { ...state, currentUserQueryStatus: REQUEST_STATUS.DONE, currentUser: action.payload };
  case ACTIONS.LOGOUT:
    return { ...initialState };
  default:
    return state;
  }
};

export const initialState = {
  loginStatus: REQUEST_STATUS.NOT_REQUESTED,
  loginError: null,
  currentUser: null,
  currentUserQueryStatus: REQUEST_STATUS.NOT_REQUESTED
};

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser, currentUserQueryStatus, loginError, loginStatus } = state;

  const login = ({ email, password }) => {
    dispatch({ type: ACTIONS.LOGIN });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: ACTIONS.LOGIN_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: ERRORS[err.code] });
      });
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({ type: ACTIONS.LOGOUT });
  };

  const resetLoginStatus = () => {
    dispatch({ type: ACTIONS.LOGIN_RESET });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: { displayName, email, photoURL, uid } });
      } else {
        dispatch({ type: ACTIONS.SET_CURRENT_USER });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, logout, login, loginStatus, loginError, resetLoginStatus }}>
      {currentUserQueryStatus !== REQUEST_STATUS.NOT_REQUESTED && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
