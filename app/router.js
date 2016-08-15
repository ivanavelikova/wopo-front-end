import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('search');
  this.route('settings');
  this.route('notifications');
  this.route('statistics');
  this.route('articles');
  this.route('portfolio');
  this.route('panel', function() {
    this.route('statistics');
    this.route('articles');
    this.route('projects');
  });
});

export default Router;
