import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.position': [
    validator('presence', true)
  ],
  'data.startDate': [
    validator('presence', true),
    validator('custom-date')
  ],
  'data.endDate': [
    validator('custom-date')
  ],
  'data.employer': [
    validator('presence', true)
  ],
  'data.responsibilities': [
    validator('presence', true)
  ]
});

export default Validations;
