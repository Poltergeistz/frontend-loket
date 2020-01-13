import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentSession: service(),

  async model(){
    const bestuurseenheid = await this.get('currentSession.group');
    const datasets = await this.store.query('employee-dataset', {
      'filter[bestuurseenheid][id]': bestuurseenheid.id
    });
    return { bestuurseenheid, datasets };
  }
});
