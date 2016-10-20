import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.jobOffers': [
    validator('presence', true),
    validator('inclusion', {
      in: [true, false]
    })
  ]
  // TODO
});

export default Validations;
