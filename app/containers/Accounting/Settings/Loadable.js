/**
 *
 * Asynchronously loads the component for Banking
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
