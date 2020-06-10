import React, { useEffect, useContext } from 'react';

import MailListView from 'components/MailListView';
import { MailContext } from 'contexts/mail';

// TODO: Check performance.
function Drafts() {
  const { drafts, getDrafts } = useContext(MailContext);

  useEffect(() => {
    getDrafts();
  }, [getDrafts]);

  return (
    <MailListView state={drafts} title="Drafts" />
  );
}

export default Drafts;
