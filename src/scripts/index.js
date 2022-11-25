import 'regenerator-runtime';
import './views/components/navbar/navbar';
import './views/components/jumbotron/jumbotron';
import './views/components/sidebar/sidebar';
import App from './views/app';

const app = new App({
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
});

export default app;