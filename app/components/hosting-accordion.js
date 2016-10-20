import Ember from 'ember';

export default Ember.Component.extend({
  domain: {
    type: 'subdomain',
    value: null
  },

  hosting: {
    type: 'wopo',
    data: {}
  }
});
