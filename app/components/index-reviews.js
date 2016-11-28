import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const slider = $('.reviews');
    this.set('slider', slider);

    slider.unslider({
      arrows: {
        prev: '<i class="fa fa-chevron-left"></i>',
        next: '<i class="fa fa-chevron-right"></i>'
      }
    });
  },

  willDestroyElement () {
    this.get('slider').unslider('destroy');
  }
});
