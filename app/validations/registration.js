import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', true),
    validator('length', {
      min: 2,
      max: 128
    })
  ],
  email: [
    validator('presence', true),
    validator('format', {
      regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      messageKey: 'errors.email'
    })
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 128
    })
  ]
}, {
  debounce: 500
});

export default Validations;
