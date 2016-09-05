import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('settings');
  this.route('notifications');
  this.route('articles');
  this.route('portfolio');
  this.route('registration');
  this.route('login');
  this.route('forgot-password');
  this.route('firststeps');

  this.route('content', function() {
    this.route('information');
    this.route('articles', function() {
      this.route('new');
    });
    this.route('jobs', function() {
      this.route('new');
    });
    this.route('projects', function() {
      this.route('new');
    });
  });
  this.route('theme', function() {
    this.route('store');
  });
  this.route('dashboard');
});

export default Router;
