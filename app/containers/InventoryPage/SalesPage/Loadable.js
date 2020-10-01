/**
 *
 * Asynchronously loads the component for ItemPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
