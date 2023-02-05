import LandingPage from '../views/pages/landing-page';
import login from '../views/pages/login';
import register from '../views/pages/register';
import dashboard from '../views/pages/dashboard';
import EditProfile from '../views/pages/edit-profile';
import profile from '../views/pages/profile';
import todo from '../views/pages/todo';
import DetailBimbingann from '../views/pages/detail-bimbingan';
import review from '../views/pages/review';




const routes = {
  '/': LandingPage,
  '/landingpage': LandingPage,
  '/login': login,
  '/register': register,
  '/dashboard': dashboard,
  '/editprofile': EditProfile,
  '/profile': profile,
  '/todo': todo,
  '/detailbimbingan/:id': DetailBimbingann,
  '/review/:id/:idTodo': review
};



export default routes;
