/**
 *
 * Asynchronously loads the component for Journal
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
