import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { inject: { service } } = Ember;

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  cookies: service(),
  intl: service(),

  host: 'http://api.wopo.dev',
  headers: Ember.computed(function() {
    const csrfToken = this.get('cookies').read('XSRF-TOKEN');
    return {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
      'X-Locale': this.get('intl').get('locale')[0]
    };
  }).volatile(),
  authorizer: 'authorizer:jwt'
});