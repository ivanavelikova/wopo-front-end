import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'model.profile_pic': [
    validator('format', {
      type: 'url'
    })
  ],
  'model.name': [
    validator('presence', true)
  ],
  'model.email': [
    validator('presence', true),
    validator('format', {
      regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      messageKey: 'errors.email'
    }),
    validator('unique-email', {
      unique: true,
      debounce: 500
    })
  ],
  'old_password': [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 255
    })
  ],
  'new_password': [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 255
    })
  ]
});

export default Validations;
