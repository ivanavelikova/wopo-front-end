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
    validator('unique-wopo-subdomain')
  ]
});

export default Validations;
