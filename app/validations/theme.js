import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.name': [
    validator('presence', true)
  ],
  'data.description': [
    validator('presence', true)
  ]
});

export default Validations;
