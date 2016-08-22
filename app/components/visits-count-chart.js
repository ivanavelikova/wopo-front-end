import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    let visitsCountChart = new Chart(this.$('#visitsCountChart'), {
      type: 'line',
      data: {
        labels: ["8.08.", "15.08.", "22.08.", "29.08.", "5.09.", "12.09."],
        datasets: [{
          label: 'Посещения на портфолиото',
          data: [1, 5, 14, 20, 35, 30],
          backgroundColor: [
            'rgba(249, 148, 62, 0.2)'
          ],
          borderColor: [
            'rgba(249, 148, 62, 1)'
          ],
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
