import Ember from 'ember';
import DS from 'ember-data';

const { inject: { service } } = Ember;

export default DS.RESTAdapter.extend({
  cookies: service(),

  host: 'http://localhost:3333',
  headers: Ember.computed(function() {
    const csrfToken = this.get('cookies').read('XSRF-TOKEN');
    return {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
    };
  }).volatile()
});