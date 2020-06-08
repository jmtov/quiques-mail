import React from 'react';

import MailListView from 'components/MailListView';

import { MAILS } from './MOCK';

function Drafts() {
  return (
    <MailListView mails={MAILS} title="Drafts" />
  );
}

export default Drafts;
