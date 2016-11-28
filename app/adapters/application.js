import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

const { inject: { service } } = Ember;

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  cookies: service(),
  intl: service(),

  host: ENV.HOST_URL,
  headers: Ember.computed(function() {
    const csrfToken = this.get('cookies').read('XSRF-TOKEN');
    return {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
      'X-Locale': this.get('intl').get('locale')[0]
    };
  }).volatile(),
  authorizer: 'authorizer:jwt'
});