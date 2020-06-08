import React from 'react';

import MailListView from 'components/MailListView';

import { MAILS } from './MOCK';

function Inbox() {
  return (
    <MailListView mails={MAILS} title="Inbox" />
  );
}

export default Inbox;
