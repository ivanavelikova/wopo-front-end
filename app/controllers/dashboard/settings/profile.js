import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  countries: [
    { id: 'en', text: 'Англия' },
    { id: 'bg', text: 'България' }
  ],

  languages: [
    { id: 'en', text: 'Английски' },
    { id: 'bg', text: 'Български' }
  ],

  alert: {
    type: null,
    content: null
  },

  showAlert: computed('alert.{type,content}', function() {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $('html, body').animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  actions: {
    submitGeneral () {
      console.log('general');
    },

    submitPassword () {
      console.log('pass');
    },

    delete () {
      const deleteProfileModal = $('#deleteProfile');
      deleteProfileModal.modal('hide');
      console.log('deleteeee');
    },

    openMediaManager () {
      let width = parseInt((window.screen.width * 80) / 100, 10);
      let height = parseInt((window.screen.height * 70) / 100, 10);

      if (width < 640) {
        width = 640;
      }

      if (height < 420) {
        height = 420;
      }

      const top = parseInt((window.screen.height - height) / 2, 10);
      const left = parseInt((window.screen.width - width) / 2, 10);

      const options = `location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes,width=${width},height=${height},top=${top},left=${left}`;
      window.open('/media-manager', null, options);

      $(window).on("message onmessage", (e) => {
        const data = e.originalEvent.data;
        this.set('model.profile_pic', data.media);
      });
    }
  }
});
