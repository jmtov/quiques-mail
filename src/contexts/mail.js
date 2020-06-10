import React, { useReducer, useCallback } from 'react';

import { REQUEST_STATUS, MAIL_SERVICE_ERRORS } from 'constants/network';
import MailService from 'services/MailService';

export const MailContext = React.createContext();

// TODO: Can be refactored to a single generator function
export const ACTIONS = {
  GET_INBOX: 'GET_INBOX',
  GET_INBOX_SUCCESS: 'GET_INBOX_SUCCESS',
  GET_INBOX_FAILURE: 'GET_INBOX_FAILURE',
  GET_SENT: 'GET_SENT',
  GET_SENT_SUCCESS: 'GET_SENT_SUCCESS',
  GET_SENT_FAILURE: 'GET_SENT_FAILURE',
  GET_DRAFTS: 'GET_DRAFTS',
  GET_DRAFTS_SUCCESS: 'GET_DRAFTS_SUCCESS',
  GET_DRAFTS_FAILURE: 'GET_DRAFTS_FAILURE',
  CLEAR_DETAIL: 'CLEAR_DETAIL',
  GET_DETAIL: 'GET_DETAIL',
  GET_DETAIL_SUCCESS: 'GET_DETAIL_SUCCESS',
  GET_DETAIL_FAILURE: 'GET_DETAIL_FAILURE',
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

const inboxReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.GET_INBOX:
    return { ...state, status: REQUEST_STATUS.LOADING };
  case ACTIONS.GET_INBOX_SUCCESS:
    return { ...state, status: REQUEST_STATUS.DONE, data: action.payload };
  case ACTIONS.GET_INBOX_FAILURE:
    return { ...state, status: REQUEST_STATUS.ERROR, error: action.payload };
  default:
    return state;
  }
};

const sentReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.GET_SENT:
    return { ...state, status: REQUEST_STATUS.LOADING };
  case ACTIONS.GET_SENT_SUCCESS:
    return { ...state, status: REQUEST_STATUS.DONE, data: action.payload };
  case ACTIONS.GET_SENT_FAILURE:
    return { ...state, status: REQUEST_STATUS.ERROR, error: action.payload };
  default:
    return state;
  }
};

const draftsReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.GET_DRAFTS:
    return { ...state, status: REQUEST_STATUS.LOADING };
  case ACTIONS.GET_DRAFTS_SUCCESS:
    return { ...state, status: REQUEST_STATUS.DONE, data: action.payload };
  case ACTIONS.GET_DRAFTS_FAILURE:
    return { ...state, status: REQUEST_STATUS.ERROR, error: action.payload };
  default:
    return state;
  }
};

const detailReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.CLEAR_DETAIL:
    return { ...initialState };
  case ACTIONS.GET_DETAIL:
    return { ...state, status: REQUEST_STATUS.LOADING };
  case ACTIONS.GET_DETAIL_SUCCESS:
    return { ...state, status: REQUEST_STATUS.DONE, data: action.payload };
  case ACTIONS.GET_DETAIL_FAILURE:
    return { ...state, status: REQUEST_STATUS.ERROR, error: action.payload };
  default:
    return state;
  }
};

const sendActionReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.SEND_ACTION:
    return { ...state, status: REQUEST_STATUS.LOADING };
  case ACTIONS.SEND_ACTION_SUCCESS:
    return { ...state, status: REQUEST_STATUS.DONE, data: action.payload };
  case ACTIONS.SEND_ACTION_FAILURE:
    return { ...state, status: REQUEST_STATUS.ERROR, error: action.payload };
  case ACTIONS.CLEAR_SEND_ACTION:
    return { ...initialState };
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
  inbox: [],
  sent: [],
  drafts: [],
  view: [],
};

// TODO: Refactor this file to ease reading
function MailContextProvider({ children }) {
  const [inbox, inboxDispatch] = useReducer(inboxReducer, initialState);
  const [sent, sentDispatch] = useReducer(sentReducer, initialState);
  const [drafts, draftsDispatch] = useReducer(draftsReducer, initialState);
  const [detail, detailDispatch] = useReducer(detailReducer, initialState);
  const [sendAction, sendActionDispatch] = useReducer(sendActionReducer, initialState);
  const [pending, pendingDispatch] = useReducer(pendingReducer, pendingInitialState);

  const getInbox = useCallback(() => {
    inboxDispatch({ type: ACTIONS.GET_INBOX });

    MailService.getInbox()
      .then(mails => {
        inboxDispatch({ type: ACTIONS.GET_INBOX_SUCCESS, payload: mails });
      })
      .catch(err => {
        inboxDispatch({ type: ACTIONS.GET_INBOX_FAILURE, payload: err });
      });
  }, []);

  const getSent = useCallback(() => {
    sentDispatch({ type: ACTIONS.GET_SENT });

    MailService.getSent()
      .then(mails => {
        let newEmails = mails;
        if (pending.sent.length) {
          newEmails = [...pending.sent.reverse(), ...mails];
        }
        sentDispatch({ type: ACTIONS.GET_SENT_SUCCESS, payload: newEmails });
      })
      .catch(err => {
        sentDispatch({ type: ACTIONS.GET_SENT_FAILURE, payload: err });
      });
  }, [pending.sent]);

  const getDrafts = useCallback(() => {
    draftsDispatch({ type: ACTIONS.GET_DRAFTS });

    MailService.getSent()
      .then(mails => {
        draftsDispatch({ type: ACTIONS.GET_DRAFTS_SUCCESS, payload: mails });
      })
      .catch(err => {
        draftsDispatch({ type: ACTIONS.GET_DRAFTS_FAILURE, payload: err });
      });
  }, []);

  // TODO: Check why it's bringing the old details
  const getDetail = useCallback(id => {
    detailDispatch({ type: ACTIONS.GET_DETAIL });

    MailService.getEmailById(id)
      .then(detailData => {
        detailDispatch({ type: ACTIONS.GET_DETAIL_SUCCESS, payload: detailData });
      })
      .catch(err => {
        if (err.code === MAIL_SERVICE_ERRORS.CANNOT_FIND_EMAIL_BY_ID.code) {
          const item = pending.view.find(pendingItem => pendingItem.id === id);
          if (item) {
            detailDispatch({ type: ACTIONS.GET_DETAIL_SUCCESS, payload: item });
          } else {
            detailDispatch({ type: ACTIONS.GET_DETAIL_FAILURE, payload: err });
          }
        } else {
          detailDispatch({ type: ACTIONS.GET_DETAIL_FAILURE, payload: err });
        }
      });
  }, [pending.view]);

  const clearDetail = useCallback(() => {
    detailDispatch({ type: ACTIONS.CLEAR_DETAIL });
  }, []);

  const sendEmail = useCallback(data => {
    sendActionDispatch({ type: ACTIONS.SEND_ACTION });

    MailService.sendEmail(data)
      .then(sendEmailData => {
        console.log(sendEmailData);
        sendActionDispatch({ type: ACTIONS.SEND_ACTION_SUCCESS, payload: sendEmailData[0] });
        pendingDispatch({ type: ACTIONS.SET_PENDING_SENT, payload: sendEmailData[0] });
        pendingDispatch({ type: ACTIONS.SET_PENDING_VIEW, payload: sendEmailData[1] }) ;
      })
      .catch(err => {
        sendActionDispatch({ type: ACTIONS.SEND_ACTION_FAILURE, payload: err });
      });
  }, []);

  const clearSendAction = useCallback(() => {
    sendActionDispatch({ type: ACTIONS.CLEAR_SEND_ACTION });
  }, []);

  return (
    <MailContext.Provider value={{
      inbox,
      getInbox,
      sent,
      getSent,
      detail,
      getDetail,
      clearDetail,
      drafts,
      getDrafts,
      sendAction,
      clearSendAction,
      sendEmail
    }}>
      {children}
    </MailContext.Provider>
  );
}

export default MailContextProvider;
