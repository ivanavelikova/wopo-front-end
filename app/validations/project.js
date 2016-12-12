import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.name': [
    validator('presence', true)
  ],
  'data.startDate': [
    validator('presence', true),
    validator('custom-date')
  ],
  'data.endDate': [
    validator('custom-date')
  ],
  'data.image_url': [
    validator('presence', true),
    validator('format', {
      type: 'url'
    })
  ],
  'data.description': [
    validator('presence', true)
  ]
});

export default Validations;
