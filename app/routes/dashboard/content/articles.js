import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';

const {
  RSVP
} = Ember;

export default BaseRoute.extend({
  model () {
    const store = this.get('store');

    return RSVP.hash({
      portfolio: store.findRecord('portfolio', 1),
      article: store.findAll('article'),
      tag: store.findAll('tag')
    });
  }
});
