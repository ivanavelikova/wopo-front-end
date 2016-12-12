import Ember from 'ember';

const { observer } = Ember;

export default Ember.Component.extend({
  singleDatePicker: false,
  options: {},

  didInsertElement () {
    const datePicker = this.$('.datepicker');
    const options = {
      parentEl: this.get('parentEl'),
      singleDatePicker: this.get('singleDatePicker'),
      showDropdowns: true,
      minDate: '01/01/1900',
      locale: {
        applyLabel: 'Избери',
        cancelLabel: 'Отказ',
        fromLabel: 'От',
        toLabel: 'До',
        daysOfWeek: [
          'Нд',
          'Пн',
          'Вт',
          'Сч',
          'Чт',
          'Пт',
          'Сб'
        ],
        monthNames: [
          "Януари",
          "Февруари",
          "Март",
          "Април",
          "Май",
          "Юни",
          "Юли",
          "Август",
          "Септември",
          "Октомври",
          "Ноември",
          "Декември"
        ],
        firstDay: 1
      }
    };
    this.set('options', options);

    datePicker.daterangepicker(options);

    datePicker.on('apply.daterangepicker', () => {
      this.set('value', datePicker.val());
    });

    this.set('datePicker', datePicker);
  },

  willDestroyElement () {
    const datePicker = this.get('datePicker');
    const instance = datePicker.data('daterangepicker');

    if (instance) {
      datePicker.off('apply.daterangepicker');
      instance.remove();
    }
  },

  resetDatePicker: observer('modalVisible', function () {
    if (this.get('modalVisible')) {
      return;
    }

    const datePicker = this.get('datePicker');
    const instance = datePicker.data('daterangepicker');

    if (instance) {
      datePicker.off('apply.daterangepicker');
      instance.remove();
    }

    const options = this.get('options');

    datePicker.daterangepicker(options);

    datePicker.on('apply.daterangepicker', () => {
      this.set('value', datePicker.val());
    });
  })
});