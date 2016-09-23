import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const { computed } = Ember;

const Validations = buildValidations({
  'data.position': [
    validator('presence', true)
  ],
  'data.startDate': [
    validator('presence', true),
    validator('date')
  ],
  'data.endDate': [
    validator('date')
  ],
  'data.employer': [
    validator('presence', true)
  ],
  'data.responsibilities': [
    validator('presence', true)
  ]
});

export default Validations;
