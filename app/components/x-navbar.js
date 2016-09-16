import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service('session'),

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  },

  didInsertElement () {
    const notifications = this.$('.notifications-desktop');
    const notificationsDropdown = this.$('.notifications-desktop .dropdown-menu');
    const notificationsContent = this.$('.notifications-desktop .ps-content');

    notificationsContent.perfectScrollbar();

    const preventClosing = function (e) {
      if (notifications.hasClass('open')) {
        e.stopPropagation();
      }
    };

    notificationsDropdown.on('click', preventClosing);

    this.set('notificationsDropdown', notificationsDropdown);
    this.set('preventClosing', preventClosing);
    this.set('notificationsContent', notificationsContent);
  },

  willDestroyElement () {
    this.get('notificationsDropdown').off('click', this.get('preventClosing'));
    this.get('notificationsContent').perfectScrollbar('destroy');
  }
});