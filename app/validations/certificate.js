import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.name': [
    validator('presence', true)
  ],
  'data.image_url': [
    validator('presence', true),
    validator('format', {
      type: 'url'
    })
  ]
});

export default Validations;
