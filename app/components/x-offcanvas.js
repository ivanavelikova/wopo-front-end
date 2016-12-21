import Ember from 'ember';

export default Ember.Component.extend({
  psContent: null,
  offcanvas: null,
  btn: null,
  toggleOffcanvas: null,
  removeClassAfterTransitionEnd: null,

  didInsertElement () {    
    const offcanvas = $('.offcanvas');
    this.set('offcanvas', offcanvas);

    offcanvas.on('transitionend', removeClassAfterTransitionEnd);

    offcanvas.on('click', toggleOffcanvas);

    const psContent = offcanvas.find('.ps-content');
    this.set('psContent', psContent);

    psContent.perfectScrollbar();

    const btn = $('.btn-offcanvas');
    this.set('btn', btn);

    btn.on('click', toggleOffcanvas);

    function toggleOffcanvas (e) {
      if (e.target !== this) {
        return;
      }

      offcanvas.addClass('offcanvas--animatable');
      offcanvas.toggleClass('offcanvas--visible');
    }

    function removeClassAfterTransitionEnd () {
      offcanvas.removeClass('offcanvas--animatable');
    }

    this.set('toggleOffcanvas', toggleOffcanvas);
    this.set('removeClassAfterTransitionEnd', removeClassAfterTransitionEnd);
  },

  willDestroyElement () {
    this.get('psContent').perfectScrollbar('destroy');
    this.get('btn').off(this.get('toggleOffcanvas'));
    this.get('offcanvas').off(this.get('toggleOffcanvas'));
    this.get('offcanvas').off(this.get('removeClassAfterTransitionEnd'));
  }
});
