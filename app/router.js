import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('registration');
  this.route('login');
  this.route('forgot-password');
  this.route('firststeps');
  this.route('dashboard', function() {
    this.route('content', function() {
      this.route('articles', function() {
        this.route('new');
      });

      this.route('jobs', function() {
        this.route('new');
      });

      this.route('projects', function() {
        this.route('new');
      });
      
      this.route('information');
    });
    
    this.route('theme', function() {
      this.route('store');
    });

    this.route('settings', function() {
      this.route('country');
      this.route('language');
      this.route('general');
    });
    
    this.route('notifications');
  });
});

export default Router;
