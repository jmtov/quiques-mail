import React from 'react';

import MailListView from 'components/MailListView';

import { inbox } from 'constants/MOCK/quique.json';

function Inbox() {
  return (
    <MailListView mails={inbox} title="Inbox" />
  );
}

export default Inbox;
