import BaseRoute from 'front-end/routes/base';

export default BaseRoute.extend({
  actions: {
    reloadModel () {
      this.refresh();
    }
  }
});
