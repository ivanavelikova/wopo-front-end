import Ember from 'ember';
import fetch from 'ember-network/fetch';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  cookies: service(),
  store: service(),
  intl: service(),
  session: service(),
  
  getData (path,  authorization, assignHeaders) {
    return this._fetch('GET', path, null, authorization, assignHeaders);
  },
  
  post (path, data, authorization, assignHeaders) {
    return this._fetch('POST', path, data, authorization, assignHeaders);
  },
  
  delete (path, data, authorization, assignHeaders) {
    return this._fetch('DELETE', path, data, authorization, assignHeaders);
  },

  _fetch (method, path, data, authorization, assignHeaders) {
    if (!assignHeaders) {
      assignHeaders = {};
    }
    
    let token;

    if (typeof authorization === 'string') {
      token = authorization;
    }

    if (authorization === true) {
      token = this.get('session.data.authenticated.token');
    }

    if (token) {
      assignHeaders['Authorization'] = `Bearer ${token}`;
    }

    let init = {};
    init['method'] = (method) ? method : 'GET';
    init['headers'] = this._headers(assignHeaders);

    if (data !== null) {
      init['body'] = JSON.stringify(data);
    }
    
    const host = this.get('store').adapterFor('application').get('host');

    return fetch(`${host}/${path}`, init)
      .then(checkStatus)
      .then(parseJSON);

    function checkStatus (response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }

    function parseJSON (response) {
      return response.json();
    }
  },

  _headers (assignHeaders) {
    const csrf = decodeURIComponent(this.get('cookies').read('XSRF-TOKEN'));
    let headers = {
      'X-XSRF-TOKEN': csrf,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.get('intl').get('locale')) {
      headers['X-Locale'] = this.get('intl').get('locale')[0];
    }

    if (assignHeaders) {
      headers = Object.assign(assignHeaders, headers);
    }

    return headers;
  }
});
