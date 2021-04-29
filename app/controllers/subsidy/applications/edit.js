import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';

export default class SubsidyApplicationsEditController extends Controller {

  @service router;

  get consumption() {
    return this.model.consumption;
  }

  get organization() {
    return this.model.organization;
  }

  @task
  * delete() {
    if (this.consumption.status.isConcept) {
      return;
    }
    try {
      /**
       * NOTE: this endpoint prevents the removal of submitted forms, preventing the removal of a consumption all together.
       */
      const forms = yield this.consumption.get('subsidyApplicationForms').toArray();
      for (const form of forms) {
        yield fetch(`/management-application-forms/${form.id}`, {
          method: 'DELETE',
        });
      }
      yield this.consumption.get('participations').invoke('destroyRecord');
      yield this.consumption.destroyRecord();
      this.router.transitionTo('subsidy.applications');
    } catch (error) {
      console.log('Removal of consumption failed because:');
      console.error(error);
      // TODO Error handling
    }
  }
}
