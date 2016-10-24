import Ember from 'ember';

const {
  observer,
  computed
} = Ember;

export default Ember.Component.extend({
  availableHostings: ['wopo', 'githubPages', 'ftp'],

  wopoHosting: {
    type: 'wopo',
    domain: {
      type: 'subdomain',
      value: null
    }
  },

  githubPagesHosting: {
    type: 'githubPages'
    // TODO
  },

  ftpHosting: {
    type: 'ftp'
    // TODO
  },

  isSubdomainWopo: computed('wopoHosting.domain.type', function () {
    const domainType = this.get('wopoHosting.domain.type');
    return domainType === 'subdomain';
  }),

  onChangeSelectedHosting: observer('data.selectedHosting', function () {
    this.set('data.hosting', null);
    const selectedHosting = this.get('data.selectedHosting');
    const hostingData = this.get(`${selectedHosting}Hosting`);
    this.set('data.hosting', hostingData);
  }),

  onChangeWopoHosting: observer('wopoHosting.*', function () {
    console.log(this.get('wopoHosting'));
  }),

  didInsertElement () {
    this._showHosting();
    this._listenCollapseShow();
    this._listenCollapseHide();
  },

  willDestroyElement () {
    //
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
        console.log('hide', hosting);
      });
    };

    for (let i = 0, length = availableHostings.length; i < length; i += 1) {
      setHosting(availableHostings[i]);
    }
  },

  _syncFromLocalStorage (hosting) {
    const dataHosting = this.get(`data.${hosting}Hosting`);
    console.log(dataHosting);
    this.set(`${hosting}Hosting`, dataHosting);
  },

  _hostingsExcept (except) {
    let availableHostings = JSON.parse(JSON.stringify(this.get('availableHostings')));
    const hostingIndex = availableHostings.indexOf(except);
    availableHostings.splice(hostingIndex, 1);

    return availableHostings;
  }
});
