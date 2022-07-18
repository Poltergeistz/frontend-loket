import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class EredienstMandatenbeheerMandatarisContactPointsNewController extends Controller {
  @service store;
  @service router;

  @tracked adres;
  @tracked telephone;
  @tracked email;

  @task
  *submit() {
    const contactPoint = this.store.createRecord('contact-punt', {
      email: this.email,
      telefoon: this.telephone,
      mandataris: this.model,
    });

    if (this.adres) {
      const addresses = yield this.store.query('adres', {
        filter: {
          'volledig-adres': this.adres.volledigAdres,
        },
      });

      let newAdres;

      if (addresses.length == 0) {
        newAdres = this.store.createRecord('adres', this.adres);
        yield newAdres.save();
      }

      contactPoint.adres = newAdres || addresses.firstObject;
    }

    yield contactPoint.save();
    yield this.router.transitionTo('eredienst-mandatenbeheer.mandataris.edit');
  }
}