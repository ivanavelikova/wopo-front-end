import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'data.wopoHosting.domain.type': [
    validator('presence', true),
    validator('inclusion', {
      in: ['subdomain'], // TODO: domain
      messageKey: 'errors.underConstruction'
    })
  ],
  'data.wopoHosting.domain.subdomain': [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
    validator('format', {
      regex: /^\w+$/,
    }),
    validator('unique-wopo-subdomain', {
      debounce: 500
    })
  ]
});

export default Validations;
