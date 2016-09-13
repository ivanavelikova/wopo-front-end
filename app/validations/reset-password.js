import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  password: [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 255
    })
  ]
}, {
  debounce: 500
});

export default Validations;
