/*
 * Banking Messages
 *
 * This contains all the text for the Banking container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Banking';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Banking container!',
  },
});
