import 'regenerator-runtime';
import './views/components/navbar/navbar';
import './views/components/jumbotron/jumbotron';
import './views/components/sidebar/sidebar';
import './views/components/loading/loading';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  drawer: document.querySelector('nav-bar').shadowRoot.querySelector('.navbar__account'),
  content: document.querySelector('#mainContent')
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  swRegister();
});

export default app;