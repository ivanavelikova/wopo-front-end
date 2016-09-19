import Ember from 'ember';

const {
  observer,
  inject: { service }
} = Ember;

export default Ember.Mixin.create({
  storage: service(),

  init () {
    this._super(...arguments);

    const data = this.get('data');
    const dataKeys = Object.keys(data);

    dataKeys.forEach(key => {
      this.set(`data.${key}`, this.get(`storage.firstSteps.${key}`));
      data.addObserver(key, this, 'updateStorage');
    });
  },

  updateStorage () {
    const data = JSON.parse(JSON.stringify(this.get('data')));
    let storage = Ember.Object.create(this.get('storage.firstSteps'));

    storage.setProperties(data);

    this.set('storage.firstSteps', storage);
  },

  updateData: observer('storage.firstSteps', function () {
    let data = this.get('data');
    const storage = this.get('storage.firstSteps');

    data.setProperties(storage);

    this.set('data', data);
  })
});
