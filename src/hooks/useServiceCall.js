import { useReducer, useEffect, useCallback } from 'react';

import { REQUEST_STATUS } from 'constants/network';

const INITIAL_STATE = {
  status: REQUEST_STATUS.NOT_REQUESTED,
  data: null,
  error: null
};

const ACTIONS = {
  CLEAR: 'CLEAR',
  GET: 'GET',
  GET_SUCCESS: 'GET_SUCCESS',
  GET_FAILURE: 'GET_FAILURE',
};

const REDUCERS = {
  CLEAR: () => {
    return { ...INITIAL_STATE };
  },
  GET: state => {
    return { ...state, status: REQUEST_STATUS.LOADING };
  },
  GET_SUCCESS: (state, action) => {
    return { ...state, status: REQUEST_STATUS.DONE, data: action.payload };
  },
  GET_FAILURE: (state, action) => {
    return { ...state, status: REQUEST_STATUS.ERROR, error: action.payload };
  },
};

const reducer = (state, action) => {
  return REDUCERS[action.type](state, action);
};

function useServiceCall(service, params) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const cleanUp = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR });
  }, []);

  const callService = useCallback((_params) => {
    dispatch({ type: ACTIONS.GET });

    service(_params)
      .then(data => {
        dispatch({ type: ACTIONS.GET_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.GET_FAILURE, payload: err });
      });
  }, [service]);

  useEffect(() => {
    callService(params);
  }, [callService, params]);

  return { state, callService, cleanUp };
}

export default useServiceCall;
