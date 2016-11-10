import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';

const {
  RSVP
} = Ember;

export default BaseRoute.extend({
  model () {
    return RSVP.hash({
      portfolio: this.get('store').findRecord('portfolio', 1)
    });
  }
});
