import { inbox, sent, view } from 'constants/MOCK/quique.json';
import { MAIL_SERVICE_ERRORS } from 'constants/network';
import { wait } from 'utils/helpers';

import { parseData } from './helpers';

const MailService = {
  getInbox() {
    return new Promise((resolve) => {
      resolve(inbox);
    });
  },
  getSent() {
    return new Promise((resolve) => {
      resolve(sent);
    });
  },
  getDrafts() {
    return new Promise((resolve) => {
      resolve(sent);
    });
  },
  // TODO: Complete
  saveDraft(draft) {
    console.log(draft);
    return new Promise((resolve) => {
      resolve();
    });
  },
  async sendEmail(data) {
    await wait(3000);
    return new Promise((resolve) => {
      const parsedData = parseData(data);
      resolve(parsedData);
    });
  },
  getEmailById(id) {
    return new Promise((resolve, reject) => {
      if (view[id]) {
        resolve(view[id]);
      } else {
        reject(MAIL_SERVICE_ERRORS.CANNOT_FIND_EMAIL_BY_ID);
      }
    });
  }
};

export default MailService;
