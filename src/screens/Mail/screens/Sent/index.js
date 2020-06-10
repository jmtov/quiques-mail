import React, { useEffect, useContext } from 'react';

import { MailContext } from 'contexts/mail';
import { MAIL_ROUTES } from 'constants/routes';

import MailListView from 'components/MailListView';
import MailEntry from 'components/MailEntry';

const SENT_FILTERS = {
  keys: ['recipient']
};

// TODO: Check performance.
function Sent() {
  const { sent, getSent } = useContext(MailContext);

  useEffect(() => {
    getSent();
  }, [getSent]);

  return (
    <MailListView filters={SENT_FILTERS} state={sent} title="Sent" mailItemRender={(item) => {
      const mailSubtitle = (item.recipient && item.recipient.name && item.recipient.name.full) || item.recipient.email;
      return (
        <MailEntry key={item.id} subtitle={`Sent to ${mailSubtitle}`} to={`${MAIL_ROUTES.VIEW.basePath}/${item.id}`} {...item} />
      );
    }}/>
  );
}

export default Sent;
