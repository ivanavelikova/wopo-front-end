import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.themeId': [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      positive: true
    })
  ]
});

export default Validations;
