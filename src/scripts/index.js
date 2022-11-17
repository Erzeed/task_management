import 'regenerator-runtime';
import './views/components/navbar/navbar';
import './views/components/jumbotron/jumbotron';
import App from './views/app';

const app = new App({
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

export default app;