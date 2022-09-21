// Layouts

// Pages
import { ConfigRouter } from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login/Login';
import Signup from '~/pages/Signup/Signup';
import Resetpass from '~/pages/Resetpass/Resetpass';
import Compiler from '~/pages/Compiler/Compiler';
// Public routes
const publicRoutes = [
    { path: ConfigRouter.Home, component: Home },
    { path: ConfigRouter.compiler, component: Compiler, layout: null },
    { path: ConfigRouter.practice, component: Compiler },
    { path: ConfigRouter.login, component: Login,layout: null },
    { path: ConfigRouter.signup, component: Signup ,layout: null},
    { path: ConfigRouter.resetpass, component: Resetpass ,layout: null}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
