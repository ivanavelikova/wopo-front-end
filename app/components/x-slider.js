import Ember from 'ember';

const {
  observer
} = Ember;

export default Ember.Component.extend({

  onInsertOrDestroy: observer('insertOrDestroy', function () {
    const slider = $('.x-slider');

    if (this.get('insertOrDestroy') === true) {
      const valueAttr = parseInt(this.get('value'), 10);

      slider.slider({
        min: 0,
        max: 100,
        value: valueAttr,
        tooltip_position: 'bottom',
        formatter (value) {
          return `${value}%`;
        }
      });
    } else {
      slider.slider('destroy');
    }
  })

});
