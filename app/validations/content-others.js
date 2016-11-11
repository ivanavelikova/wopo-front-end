import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'model.portfolio.about': [
    validator('presence', true)
  ]
});

export default Validations;
