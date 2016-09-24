import Ember from 'ember';

const {
  computed,
  observer,
  defineProperty,
  inject: { service },
  $: jQuery
} = Ember;

export default Ember.Mixin.create({
  intl: service(),

  init () {
    this._super(...arguments);

    const data = this.get('data');
    
    const defineProperties = (key) => {
      defineProperty(this, `${key}Validation`, computed.oneWay(`validations.attrs.data.${key}`));
      defineProperty(this, `${key}ShowErrorMessage`, computed(`${key}Validation.isDirty`, `${key}Validation.isInvalid`, `data.${key}`, function() {
        return this.get(`${key}Validation.isDirty`) && this.get(`${key}Validation.isInvalid`) && this.get(`data.${key}`) !== null;
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

  updateData: observer('modalVisible', function () {
    if (this.get('modalVisible')) {
      return;
    }

    const data = this.get('data');

    for (let key in data) {
      if (key !== 'index') {
        this.set(`data.${key}`, null);
      }
    }
  }),

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

        jQuery(`.modal.${this.get('modalTarget')}`).animate({ scrollTop: 0 });

        return;
      }
      
      jQuery(':focus').blur();
      
      if (this.get('index')) {
        this.sendAction('success', this.get('index'));
        return;
      }

      this.sendAction('success');
    }
  }
});
