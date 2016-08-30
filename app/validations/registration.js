import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 48
    })
  ]
});

export default Validations;
