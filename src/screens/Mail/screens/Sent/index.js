import React, { useContext, useMemo } from 'react';

import { MAIL_ROUTES } from 'constants/routes';

import MailListView from 'components/MailListView';
import MailEntry from 'components/MailEntry';
import useServiceCall from 'hooks/useServiceCall';
import MailService from 'services/MailService';
import { MailContext } from 'contexts/mail';

const SENT_FILTERS = {
  keys: ['recipient']
};

// TODO: Check performance.
function Sent() {
  const { state: sent } = useServiceCall(MailService.getSent);
  const { pending } = useContext(MailContext);

  const newState = useMemo(() => {
    let newData = [];
    if (pending.sent && pending.sent.length)  newData = [...pending.sent].reverse();
    if (sent.data && sent.data.length) newData = [...newData, ...sent.data];

    return {
      ...sent,
      data: newData
    };
  }, [pending.sent, sent]);

  return (
    <MailListView filters={SENT_FILTERS} state={newState} title="Sent" mailItemRender={(item) => {
      const mailSubtitle = (item.recipient && item.recipient.name && item.recipient.name.full) || item.recipient.email;
      return (
        <MailEntry key={item.id} subtitle={`Sent to ${mailSubtitle}`} to={`${MAIL_ROUTES.VIEW.basePath}/${item.id}`} {...item} />
      );
    }}/>
  );
}

export default Sent;
