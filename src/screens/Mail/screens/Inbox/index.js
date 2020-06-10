import React, { useEffect, useContext } from 'react';

import MailListView from 'components/MailListView';
import { MailContext } from 'contexts/mail';

// TODO: Check performance.
function Inbox() {
  const { inbox, getInbox } = useContext(MailContext);

  useEffect(() => {
    getInbox();
  }, [getInbox]);

  return (
    <MailListView state={inbox} title="Inbox" />
  );
}

export default Inbox;
