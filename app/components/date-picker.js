import Ember from 'ember';

export default Ember.Component.extend({
  singleDatePicker: false,

  didInsertElement () {
    const datePicker = this.$('.datepicker');

    datePicker.daterangepicker({
      parentEl: this.get('parentEl'),
      singleDatePicker: this.get('singleDatePicker'),
      showDropdowns: true,
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
    });

    datePicker.on('apply.daterangepicker', () => {
      this.set('value', datePicker.val());
    });

    this.set('datePicker', datePicker);
  },

  willDestroyElement () {
    const instance = this.get('datePicker').data('daterangepicker');
    instance.remove();
  }
});
