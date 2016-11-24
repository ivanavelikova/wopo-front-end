import Ember from 'ember';

export default Ember.Component.extend({
  data: [],

  didInsertElement () {
    let labels = [...Array(31).keys()];
    labels.shift();

    let visitsCountChart = new Chart(this.$('#visitsCountChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Посещения на портфолиото',
          data: this.get('data'),
          backgroundColor: 'rgba(249, 148, 62, 0.2)',
          borderColor: 'rgba(249, 148, 62, 1)',
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        }
      }
    });

    this.set('visitsCountChart', visitsCountChart);
  },

  willDestroyElement () {
    this.get('visitsCountChart').destroy();
  }
});
