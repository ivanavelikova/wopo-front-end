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

      this.route('others');

      this.route('skills', function() {
        this.route('new');
      });

      this.route('education', function() {
        this.route('new');
      });

      this.route('certificates', function() {
        this.route('new');
      });
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

  this.route('users', function() {
    this.route('confirmation');
  });
});

export default Router;
