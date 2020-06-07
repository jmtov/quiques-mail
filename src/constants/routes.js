import Login from 'screens/Login';
import Inbox from 'screens/Inbox';

export const ROUTES = {
  LOGIN: {
    id: 0,
    name: 'login',
    path: '/login',
    component: Login,
    exact: true,
  },
  INBOX: {
    id: 1,
    name: 'inbox',
    path: '/inbox',
    component: Inbox,
    exact: true,
    isPrivate: true,
  },
  DEFAULT: {
    id: 1,
    name: 'home',
    path: '/',
    isPrivate: true,
    component: Inbox
  }
};
