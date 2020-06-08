import { Document as DocumentIcon, Inbox as InboxIcon, Send as SentIcon } from 'grommet-icons';

import Login from 'screens/Login';
import Inbox from 'screens/Inbox';
import Sent from 'screens/Sent';
import Drafts from 'screens/Drafts';
import Compose from 'screens/Compose';
import View from 'screens/View';

export const ROUTES = {
  LOGIN: {
    id: 0,
    name: 'login',
    path: '/login',
    component: Login,
    exact: true,
    navbar: {
      hidden: true
    },
  },
  INBOX: {
    id: 5,
    name: 'inbox',
    path: '/inbox',
    component: Inbox,
    exact: true,
    isPrivate: true,
    navbar: {
      icon: InboxIcon,
    },
  },
  SENT: {
    id: 10,
    name: 'sent',
    path: '/sent',
    component: Sent,
    exact: true,
    isPrivate: true,
    navbar: {
      icon: SentIcon,
    },
  },
  DRAFTS: {
    id: 15,
    name: 'drafts',
    path: '/drafts',
    component: Drafts,
    exact: true,
    isPrivate: true,
    navbar: {
      icon: DocumentIcon,
    },
  },
  COMPOSE: {
    id: 20,
    name: 'compose',
    path: '/compose',
    component: Compose,
    exact: true,
    isPrivate: true,
    navbar: {
      hidden: true,
    },
  },
  VIEW: {
    id: 25,
    name: 'view',
    path: '/view/:id',
    basePath: '/view',
    component: View,
    isPrivate: true,
    navbar: {
      hidden: true,
    },
  },
  DEFAULT: {
    id: 100,
    name: 'home',
    path: '/',
    isPrivate: true,
    component: Inbox,
    navbar: {
      hidden: true,
    },
  }
};
