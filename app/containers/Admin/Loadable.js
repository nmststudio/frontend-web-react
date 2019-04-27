/**
 *
 * Asynchronously loads the component for Admin
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
