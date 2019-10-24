import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['col--5-12 container-flex--contain'],
  router: service(),
  showExitModal: false,
  actions: {
    close(){
      this.close();
    }
  }
});
