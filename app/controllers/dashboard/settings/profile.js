import Ember from 'ember';

export default Ember.Controller.extend({
  countries: [
    { id: 'en', text: 'Англия' },
    { id: 'bg', text: 'България' }
  ],
  languages: [
    { id: 'en', text: 'Английски' },
    { id: 'bg', text: 'Български' }
  ]
});
