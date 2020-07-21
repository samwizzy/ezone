/**
 *
 * Asynchronously loads the component for schedule
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
