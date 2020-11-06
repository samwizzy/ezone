/*
 * Journal Messages
 *
 * This contains all the text for the Journal container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Journal';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Journal container!',
  },
});
