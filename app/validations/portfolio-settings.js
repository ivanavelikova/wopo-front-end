import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'model.title': [
    validator('presence', true)
  ],
  'model.job_offers': [
    validator('presence', true),
    validator('inclusion', {
      in: [true, false]
    })
  ]
});

export default Validations;
