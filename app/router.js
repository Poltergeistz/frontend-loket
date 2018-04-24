import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('route-not-found', {
    path: '/*wildcard'
  });
  this.route('mandatenbeheer', function(){
    this.route('mandatarissen', function(){
      this.route('new');
      this.route('new-person');
      this.route('edit', {path: '/:id/edit'});
    });

    this.route('personen', function() {});
  });
  this.route('administratieve-gegevens', function() {});
});

export default Router;
