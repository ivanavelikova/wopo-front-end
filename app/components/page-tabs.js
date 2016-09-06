import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    let pageTabs = this.$('.page-tabs');
    let pageTabsScroll = this.$('.page-tabs-scroll');

    function pageTitleFades () {
      let pageTabsScrollWidth = pageTabsScroll.width();
      let widtPlusScrollLeft = pageTabsScrollWidth + pageTabsScroll.scrollLeft();
      let scrollWidth = pageTabsScroll.prop('scrollWidth');
      let scrollable = pageTabsScrollWidth < pageTabsScroll.prop('scrollWidth');

      if (pageTabsScrollWidth === scrollWidth || widtPlusScrollLeft === scrollWidth) {
        pageTabs.removeClass('fade-right');
      }

      if (pageTabsScroll.scrollLeft() === 0) {
        pageTabs.removeClass('fade-left');
      }

      if (!scrollable) {
        return;
      }

      if (widtPlusScrollLeft !== scrollWidth) {
        pageTabs.addClass('fade-right');
      }

      if (scrollable && pageTabsScroll.scrollLeft() !== 0) {
        pageTabs.addClass('fade-left');
      }
    }

    pageTitleFades();
    this.$(window).on('resize', pageTitleFades);
    pageTabsScroll.on('scroll', pageTitleFades);

    this.set('pageTabsScroll', pageTabsScroll);
    this.set('pageTitleFades', pageTitleFades);
  },

  willDestroyElement () {
    this.$(window).off('resize', this.get('pageTitleFades'));
    this.get('pageTabsScroll').off('scroll');
  }
});
