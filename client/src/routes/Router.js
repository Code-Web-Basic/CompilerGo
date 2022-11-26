// Layouts

// Pages
import { ConfigRouter } from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login/Login';
import Signup from '~/pages/Signup/Signup';
import Resetpass from '~/pages/Resetpass/Resetpass';
import Compiler from '~/pages/Compiler/Compiler';
import Practice from '~/pages/Practice/Practice';
import Solution from '~/pages/Solution/Solution';
// Public routes
const publicRoutes = [
    { path: ConfigRouter.Home, component: Home },
    { path: ConfigRouter.compiler, component: Compiler, layout: null },
    { path: ConfigRouter.practice, component: Practice },
    { path: ConfigRouter.login, component: Login, layout: null },
    { path: ConfigRouter.signup, component: Signup, layout: null },
    { path: ConfigRouter.resetpass, component: Resetpass, layout: null },
    { path: ConfigRouter.solution, component: Solution },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
