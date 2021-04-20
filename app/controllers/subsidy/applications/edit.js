import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';

export default class SubsidyApplicationsEditController extends Controller {
  @service router;

  get consumption() {
    return this.model.consumption;
  }

  get organization() {
    return this.model.organization;
  }

  @task
  * deleteConsumption() {
    // TODO check if this would also delete all the linked data
    try {
      yield this.consumption.destroyRecord();
      this.router.transitionTo('subsidy.applications');
    } catch (error) {
      // TODO Error handling
    }
  }
}
