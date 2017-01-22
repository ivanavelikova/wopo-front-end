import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const input = $('.tags-input');

    input.tagsinput({
      tagClass: 'badge badge-primary'
    });

    const bootstrapInput = $('.bootstrap-tagsinput input');
    const bootstrapInputSize = bootstrapInput.attr('placeholder').length + 4;
    bootstrapInput.attr('size', bootstrapInputSize);

    bootstrapInput.keypress(e => {
      if (e.which === 13) {
        const check = setInterval(() => {
          if (bootstrapInput.attr('size') !== bootstrapInputSize) {
            bootstrapInput.attr('size', bootstrapInputSize);
            clearInterval(check);
          }
        }, 100);
      }
    });

    this.set('input', input);
  },

  willDestroyElement () {
    this.get('input').tagsinput('destroy');
  }
});
