import { Document as DocumentIcon, Inbox as InboxIcon, Send as SentIcon } from 'grommet-icons';

import Login from 'screens/Login';
import Mail from 'screens/Mail';
import Inbox from 'screens/Mail/screens/Inbox';
import Sent from 'screens/Mail/screens/Sent';
import Drafts from 'screens/Mail/screens/Drafts';
import Compose from 'screens/Mail/screens/Compose';
import View from 'screens/Mail/screens/View';

export const GLOBAL_ROUTES = {
  LOGIN: {
    id: 0,
    name: 'login',
    path: '/login',
    component: Login,
    exact: true,
  },
  MAIL: {
    id: 0,
    name: 'mail',
    path: '/mail',
    component: Mail,
  },
  DEFAULT: {
    id: 100,
    name: 'home',
    path: '/',
    isPrivate: true,
  }
};

export const MAIL_ROUTES = {
  INBOX: {
    id: 5,
    name: 'inbox',
    path: '/mail/inbox',
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
    path: '/mail/sent',
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
    path: '/mail/drafts',
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
    path: '/mail/compose',
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
    path: '/mail/view/:id',
    basePath: '/mail/view',
    component: View,
    isPrivate: true,
    navbar: {
      hidden: true,
    },
  },
};
