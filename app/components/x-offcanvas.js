import Ember from 'ember';

export default Ember.Component.extend({
  offcanvas: null,
  btn: null,
  toggleOffcanvas: null,
  onTransitionEnd: null,

  didInsertElement () {
    const offcanvas = $('.offcanvas');
    this.set('offcanvas', offcanvas);

    offcanvas.on('transitionend', onTransitionEnd);

    offcanvas.on('click', toggleOffcanvas);

    const btn = $('.btn-offcanvas');
    this.set('btn', btn);

    btn.on('click', toggleOffcanvas);

    const closeBtn = offcanvas.find('.close');

    function toggleOffcanvas (e) {
      if (e.target !== this && e.target !== closeBtn.find('span')[0]) {
        return;
      }

      offcanvas.addClass('offcanvas--animatable');
      offcanvas.toggleClass('offcanvas--visible');
    }

    function onTransitionEnd () {
      offcanvas.removeClass('offcanvas--animatable');
    }

    this.set('toggleOffcanvas', toggleOffcanvas);
    this.set('onTransitionEnd', onTransitionEnd);
  },

  willDestroyElement () {
    this.get('btn').off('click', this.get('toggleOffcanvas'));
    this.get('offcanvas').off('click', this.get('toggleOffcanvas'));
    this.get('offcanvas').off('transitionend', this.get('onTransitionEnd'));
  }
});
