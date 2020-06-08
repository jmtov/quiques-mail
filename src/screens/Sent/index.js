import React from 'react';

import MailListView from 'components/MailListView';

import { MAILS } from './MOCK';

function Sent() {
  return (
    <MailListView mails={MAILS} title="Sent" />
  );
}

export default Sent;
