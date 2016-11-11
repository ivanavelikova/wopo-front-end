import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.organization': [
    validator('presence', true)
  ],
  'data.startDate': [
    validator('presence', true),
    validator('date')
  ],
  'data.endDate': [
    validator('date')
  ]
});

export default Validations;
