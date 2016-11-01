import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.name': [
    validator('presence', true)
  ],
  'data.familiarity': [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      positive: true,
      lte: 100
    })
  ]
});

export default Validations;
