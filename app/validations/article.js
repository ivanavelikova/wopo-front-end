import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.title': [
    validator('presence', true)
  ],
  'data.image_url': [
    validator('presence', true),
    validator('format', {
      type: 'url'
    })
  ],
  'data.content': [
    validator('presence', true)
  ],
  'data.tags': [
    validator('presence', true)
  ]
});

export default Validations;
