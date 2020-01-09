import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: service(),

  beforeModel() {
    if (!this.currentSession.canAccessPersoneelsbeheer)
      this.transitionTo('index');
  },

  async model(){
    const bestuurseenheid = await this.get('currentSession.group');
    const datasets = await this.store.query('employee-dataset', {
      include: 'periods,bestuurseenheid,subjects,periods.time-period',
      'filter[bestuurseenheid][id]': bestuurseenheid.id
    });
    //TODO: what does subjects mean here?
    return { bestuurseenheid, datasets };
  }
});
