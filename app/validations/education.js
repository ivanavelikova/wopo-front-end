import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.organization': [
    validator('presence', true)
  ],
  'data.startDate': [
    validator('presence', true),
    validator('custom-date')
  ],
  'data.endDate': [
    validator('custom-date')
  ]
});

export default Validations;
