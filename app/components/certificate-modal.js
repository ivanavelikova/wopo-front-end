import Ember from 'ember';
import Validations from '../validations/certificate';
import FormModal from '../mixins/form-modal';
import PeriodPicker from '../mixins/period-picker';

const CertificateModalMixin = Ember.Mixin.create(Validations, FormModal, PeriodPicker);

export default Ember.Component.extend(CertificateModalMixin, {
  actions: {
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
        this.set('data.image_url', data.media);
      });
    }
  }
});
