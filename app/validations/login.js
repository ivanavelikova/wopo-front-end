import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', {
      regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      messageKey: 'errors.email'
    }),
    validator('unique-email', {
      unique: false
    })
  ],
  password: [
    validator('presence', true)
  ]
}, {
  debounce: 500
});

export default Validations;
