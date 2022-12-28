import LandingPage from '../views/pages/landing-page';
import login from '../views/pages/login';
import register from '../views/pages/register';
import dashboard from '../views/pages/dashboard';
import profile from '../views/pages/profile';

const routes = {
  '/': LandingPage,
  '/landingpage': LandingPage,
  '/login': login,
  '/register': register,
  '/dashboard': dashboard,
  '/profile': profile
};

export default routes;
