import Ember from 'ember';
import Validations from '../validations/skills';

const {
  computed,
  defineProperty,
  inject: { service }
} = Ember;

export default Ember.Component.extend(Validations, {
  intl: service(),

  init() {
    this._super(...arguments);

    const data = this.get('data');
    
    const defineProperties = (key) => {
      defineProperty(this, `${key}Validation`, computed.oneWay(`validations.attrs.data.${key}`));
      defineProperty(this, `${key}ShowErrorMessage`, computed(`${key}Validation.isDirty`, `${key}Validation.isInvalid`, function() {
        return this.get(`${key}Validation.isDirty`) && this.get(`${key}Validation.isInvalid`);
      }));
    };

    for (let key in data) {
      if (key !== 'index') {
        defineProperties(key);
      }
    }
  },

  alert: {
    type: null,
    content: null
  },

  modalVisible: null,

  showAlert: Ember.computed('alert.{type,content}', function () {
    return this.get('alert.type') !== null && this.get('alert.content') !== null;
  }),

  actions: {
    submitForm () {
      if (!this.get('validations.isValid')) {
        this.set('alert', {
          type: 'info',
          content: this.get('intl').t('errors.fill')
        });
        return;
      }
      
      this.set('modalVisible', false);

      if (this.get('index')) {
        this.sendAction('success', this.get('index'));
        return;
      }

      this.sendAction('success');
    }
  }
});
