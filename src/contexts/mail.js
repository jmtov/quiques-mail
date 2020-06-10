import React, { useReducer, useCallback } from 'react';

import { REQUEST_STATUS } from 'constants/network';
import MailService from 'services/MailService';

export const MailContext = React.createContext();

export const ACTIONS = {
  CLEAR_SEND_ACTION: 'CLEAR_SEND_ACTION',
  SEND_ACTION: 'SEND_ACTION',
  SEND_ACTION_SUCCESS: 'SEND_ACTION_SUCCESS',
  SEND_ACTION_FAILURE: 'SEND_ACTION_FAILURE',
  SAVE_DRAFT: 'SAVE_DRAFT',
  SAVE_DRAFT_SUCCESS: 'SAVE_DRAFT_SUCCESS',
  SAVE_DRAFT_FAILURE: 'SAVE_DRAFT_FAILURE',
  SET_PENDING_INBOX: 'SET_PENDING_INBOX',
  SET_PENDING_SENT: 'SET_PENDING_SENT',
  SET_PENDING_DRAFTS: 'SET_PENDING_DRAFTS',
};

const sendActionReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.SEND_ACTION:
    return { ...state, status: REQUEST_STATUS.LOADING };
  case ACTIONS.SEND_ACTION_SUCCESS:
    return { ...state, status: REQUEST_STATUS.DONE, data: action.payload };
  case ACTIONS.SEND_ACTION_FAILURE:
    return { ...state, status: REQUEST_STATUS.ERROR, error: action.payload };
  default:
    return state;
  }
};

const pendingReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.SET_PENDING_INBOX:
    return { ...state, inbox: action.payload };
  case ACTIONS.SET_PENDING_SENT:
    return { ...state, sent: [...state.sent, action.payload] };
  case ACTIONS.SET_PENDING_VIEW:
    return { ...state, view: [...state.view, action.payload] };
  case ACTIONS.SET_PENDING_DRAFTS:
    return { ...state, drafts: [...state.drafts, action.payload] };
  case ACTIONS.SET_PENDING_COMPOSE:
    return { ...state, compose: [...state.compose, action.payload] };
  default:
    return state;
  }
};

const initialState = {
  status: REQUEST_STATUS.NOT_REQUESTED,
  data: null,
  error: null
};

const pendingInitialState = {
  sent: [],
  drafts: [],
  view: [],
  compose: [],
};

function MailContextProvider({ children }) {
  const [sendAction, sendActionDispatch] = useReducer(sendActionReducer, initialState);
  const [pending, pendingDispatch] = useReducer(pendingReducer, pendingInitialState);

  const sendEmail = useCallback(data => {
    sendActionDispatch({ type: ACTIONS.SEND_ACTION });

    MailService.sendEmail(data)
      .then(sendEmailData => {
        sendActionDispatch({ type: ACTIONS.SEND_ACTION_SUCCESS, payload: sendEmailData[0] });
        pendingDispatch({ type: ACTIONS.SET_PENDING_SENT, payload: sendEmailData[0] });
        pendingDispatch({ type: ACTIONS.SET_PENDING_VIEW, payload: sendEmailData[1] }) ;
      })
      .catch(err => {
        sendActionDispatch({ type: ACTIONS.SEND_ACTION_FAILURE, payload: err });
      });
  }, []);

  const saveDraft = useCallback(data => {
    MailService.saveDraft(data)
      .then(draftData => {
        pendingDispatch({ type: ACTIONS.SET_PENDING_COMPOSE, payload: draftData[0] }) ;
        pendingDispatch({ type: ACTIONS.SET_PENDING_DRAFTS, payload: draftData[1] }) ;
      });
  }, []);

  return (
    <MailContext.Provider value={{
      sendAction,
      pending,
      saveDraft,
      sendEmail
    }}>
      {children}
    </MailContext.Provider>
  );
}

export default MailContextProvider;
