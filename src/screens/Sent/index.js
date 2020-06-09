import React from 'react';

import { sent } from 'constants/MOCK/quique.json';

import MailListView from 'components/MailListView';

function Sent() {
  return (
    <MailListView mails={sent} title="Sent" />
  );
}

export default Sent;
