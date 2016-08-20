import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    let userCountChart = new Chart(this.$('#userCountChart'), {
      type: 'line',
      data: {
        labels: ["8.08.", "15.08.", "22.08.", "29.08.", "5.09.", "12.09."],
        datasets: [{
          label: 'Последователи',
          data: [1, 5, 14, 20, 35, 30],
          backgroundColor: [
            'rgba(89, 159, 208, 0.2)'
          ],
          borderColor: [
            'rgba(89, 159, 208, 1)'
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

    this.set('userCountChart', userCountChart);
  }
});
