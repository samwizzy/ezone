/**
 *
 * Asynchronously loads the component for Backdrop
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
