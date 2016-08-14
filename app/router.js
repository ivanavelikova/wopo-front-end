import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('article');
  this.route('profile');
  this.route('search');
  this.route('settings');
  this.route('notifications');
  this.route('statistics');
  this.route('projects');
  this.route('articles');
});

export default Router;
