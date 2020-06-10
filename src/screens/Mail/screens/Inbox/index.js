import React from 'react';

import MailListView from 'components/MailListView';
import useServiceCall from 'hooks/useServiceCall';
import MailService from 'services/MailService';

// TODO: Check performance.
function Inbox() {
  const { state: inbox } = useServiceCall(MailService.getInbox);

  return (
    <MailListView state={inbox} title="Inbox" />
  );
}

export default Inbox;
