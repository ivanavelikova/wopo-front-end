import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  about: [
    validator('presence', true)
  ]
});

export default Validations;
