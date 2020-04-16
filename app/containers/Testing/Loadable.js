/**
 *
 * Asynchronously loads the component for Testing
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
