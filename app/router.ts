import EmberRouter from '@embroider/router';
import config from 'catechesis/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('confession', { path: '/confession/:confession' }, function () {
    this.route('chapter', { path: '/:chapter' });
  });
  this.route('catechism', { path: '/:catechism' }, function () {
    this.route('question', { path: '/:question' }, function () {
      this.route('scripture', { path: '/' });
      this.route('commentary');
      this.route('prayer');
    });
  });
});
