/**
 *
 * Asynchronously loads the component for project mgt
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
