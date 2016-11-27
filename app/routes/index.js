import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';

const {
  run: {
    scheduleOnce
  }
} = Ember;

export default BaseRoute.extend({
  actions: {
    didTransition () {
      scheduleOnce('afterRender', this, () => {
        const slider = $('.reviews');
        this.set('slider', slider);

        slider.unslider({
          arrows: {
            prev: '<i class="fa fa-chevron-left"></i>',
            next: '<i class="fa fa-chevron-right"></i>'
          }
        });
      });
    },

    willTransition () {
      this.get('slider').unslider('destroy');
    }
  }
});
