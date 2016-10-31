import Ember from 'ember';
import Validations from '../validations/hosting-accordion';

const {
  observer,
  computed
} = Ember;

export default Ember.Component.extend(Validations, {
  availableHostings: ['wopo', 'githubPages', 'ftp'],

  wopoHosting: {
    domain: {
      type: 'subdomain',
      subdomain: null,
      domain: null
    }
  },

  githubPagesHosting: {
    // TODO
  },

  ftpHosting: {
    // TODO
  },

  isSubdomainWopo: computed('wopoHosting.domain.type', function () {
    const domainType = this.get('wopoHosting.domain.type');
    return domainType === 'subdomain';
  }),

  showWopoSubdomainFullUrl: computed('validations.attrs.data.wopoHosting.domain.subdomain.isValid', function () {
    const subdomain = this.get('wopoHosting.domain.subdomain');
    const validation = this.get(`validations.attrs.data.wopoHosting.domain.subdomain.isValid`);

    return subdomain !== null && subdomain !== '' && validation;
  }),

  isSubdomainWopoNotNull: computed('wopoHosting.domain.subdomain', function () {
    return this.get('wopoHosting.domain.subdomain') !== null;
  }),

  onChangeWopoHosting: observer('wopoHosting.domain.{type,subdomain,domain}', function () {
    if (this.get('data.selectedHosting') !== 'wopo') {
      return;
    }

    this.set('data.wopoHosting', null);
    this.set('data.wopoHosting', this.get('wopoHosting'));

    this._wopoHostingSetValidation();
  }),

  didInsertElement () {
    this._showHosting();
    this._listenCollapseShow();
    this._listenCollapseHide();
  },

  willDestroyElement () {
    //
  },

  _wopoHostingSetValidation () {
    setTimeout(() => {
      const domainType = this.get('validations.attrs.data.wopoHosting.domain.type.isInvalid');
      const selectedDomainType = this.get('wopoHosting.domain.type');
      const domain = this.get(`validations.attrs.data.wopoHosting.domain.${selectedDomainType}.isInvalid`);

      this.set('hostingIsInvalid', domainType || domain);
    }, 1000);
  },

  _showHosting () {
    const selectedHosting = this.get('data.selectedHosting');
    const hostingsToHide = this._hostingsExcept(selectedHosting);

    this._hideHostings(hostingsToHide);
    $(`#${selectedHosting}Collapse`).collapse('show');
  },

  _hideHostings (hostings) {
    for (let i = 0, length = hostings.length; i < length; i += 1) {
      $(`#${hostings[i]}Collapse`).collapse('hide');
    }
  },

  _listenCollapseShow () {
    const availableHostings = this.get('availableHostings');

    const setHosting = (hosting) => {
      $(`#${hosting}Collapse`).on('shown.bs.collapse', () => {
        this._syncFromLocalStorage(hosting);

        if (hosting === 'wopo') {
          this._wopoHostingSetValidation();
        }
      });

      $(`#${hosting}Collapse`).on('show.bs.collapse', () => {
        const hostingsToHide = this._hostingsExcept(hosting);
        this._hideHostings(hostingsToHide);
        this.set('data.selectedHosting', hosting);
      });
    };

    for (let i = 0, length = availableHostings.length; i < length; i += 1) {
      setHosting(availableHostings[i]);
    }
  },

  _listenCollapseHide () {
    const availableHostings = this.get('availableHostings');

    const setHosting = (hosting) => {
      $(`#${hosting}Collapse`).on('hide.bs.collapse', () => {
        const selectedHosting = this.get('data.selectedHosting');

        if (hosting === selectedHosting) {
          this.set('data.selectedHosting', null);
        }
      });
    };

    for (let i = 0, length = availableHostings.length; i < length; i += 1) {
      setHosting(availableHostings[i]);
    }
  },

  _syncFromLocalStorage (hosting) {
    const dataHosting = this.get(`data.${hosting}Hosting`);
    this.set(`${hosting}Hosting`, dataHosting);
  },

  _hostingsExcept (except) {
    let availableHostings = JSON.parse(JSON.stringify(this.get('availableHostings')));
    const hostingIndex = availableHostings.indexOf(except);
    availableHostings.splice(hostingIndex, 1);

    return availableHostings;
  }
});
