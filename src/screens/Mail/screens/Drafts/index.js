import React, { useContext, useMemo } from 'react';

import MailListView from 'components/MailListView';
import useServiceCall from 'hooks/useServiceCall';
import MailService from 'services/MailService';
import { MailContext } from 'contexts/mail';

// TODO: Check performance.
function Drafts() {
  const { state: drafts } = useServiceCall(MailService.getDrafts);
  const { pending } = useContext(MailContext);

  const newState = useMemo(() => {
    let newData = [];
    if (pending.drafts && pending.drafts.length)  newData = [...pending.drafts].reverse();
    if (drafts.data && drafts.data.length) newData = [...newData, ...drafts.data];

    return {
      ...drafts,
      data: newData
    };
  }, [pending.drafts, drafts]);

  return (
    <MailListView state={newState} title="Drafts" />
  );
}

export default Drafts;
