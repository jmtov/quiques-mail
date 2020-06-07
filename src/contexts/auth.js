import React, { useReducer, useEffect } from 'react';

import { REQUEST_STATUS } from 'constants/network';
import { KEYS } from 'constants/localStorage';

export const AuthContext = React.createContext();

export const ACTIONS = {
  LOGOUT: 'LOGOUT',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

export const reducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.SET_CURRENT_USER:
    return { ...state, currentUserQueryStatus: REQUEST_STATUS.DONE, currentUser: action.payload };
  case ACTIONS.LOGOUT:
    return { ...initialState };
  default:
    return state;
  }
};

export const initialState = {
  login: false,
  currentUser: null,
  currentUserQueryStatus: REQUEST_STATUS.NOT_REQUESTED
};

// TODO: Refactor LS storing to securely store.
function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = state;

  const setCurrentUser = user => {
    dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: user });
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  };

  const logout = () => {
    dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: null });
    localStorage.clear();
  };

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
      dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: currentUser });
    } catch(err) {
      console.error('Something happened when parsing data from LS');
      dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: null });
      localStorage.clear();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, logout, setCurrentUser }}>
      {state.currentUserQueryStatus !== REQUEST_STATUS.NOT_REQUESTED && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
