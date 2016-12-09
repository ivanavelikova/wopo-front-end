import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('registration');
  this.route('login');
  this.route('forgot-password');
  this.route('reset-password');
  this.route('confirmation');
  this.route('welcome');
  this.route('dashboard', function() {
    this.route('content', function() {
      this.route('articles');

      this.route('projects');

      this.route('jobs', function() {});

      this.route('others');

      this.route('skills', function() {});

      this.route('education', function() {});

      this.route('certificates', function() {});
    });

    this.route('theme', function() {
      this.route('store');
    });

    this.route('notifications');
    this.route('settings', function() {
      this.route('portfolio');
      this.route('profile');
    });
  });
  this.route('media-manager');
  this.route('contacts');
  this.route('about');
  this.route('privacy');
  this.route('terms');
});

export default Router;
