// Layouts

// Pages
import { ConfigRouter } from '~/config';
import Home from '~/pages/Home';
import Compiler from '~/pages/Compiler/Compiler';
// Public routes
const publicRoutes = [
    { path: ConfigRouter.Home, component: Home },
    { path: ConfigRouter.compiler, component: Compiler, layout: null },
    { path: ConfigRouter.practice, component: Compiler },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
