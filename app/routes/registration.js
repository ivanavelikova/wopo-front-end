import Ember from 'ember';
import Validations from '../validations/registration';

export default Ember.Route.extend(Validations, {
  model () {
    return this;
  }
});
