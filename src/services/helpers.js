import { createGUID } from 'utils/helpers';

export const parseData = (data) => {
  const date = new Date();
  const baseData = {
    id: createGUID(),
    sender: {
      name: {
        full: data.senderName
      },
      email: data.sender
    },
    recipient: {
      email: data.recipient
    },
    subject: data.subject,
    timestamp: date.getTime(),
    sent: `${date}`
  };

  const sentData = {
    ...baseData,
    preview: data.body.split(' ').slice(0, 28).join(' '),
  };

  const viewData = {
    ...baseData,
    text: data.body
  };

  return [sentData, viewData];
};
