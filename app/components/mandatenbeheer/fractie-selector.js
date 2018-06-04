import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  currentSession: service(),

  async didReceiveAttrs(){
    this.set('_fractie', this.get('fractie'));
    let bestuurseenheid = await this.get('currentSession.group');
    let bestuursorganen = await this.getBestuursorganen(bestuurseenheid.id);
    this.set('bestuursorganenId', bestuursorganen.map( o => o.get('id') ));
  },

  getBestuursorganen: async function(bestuurseenheidId){
    const bestuursorganen = await this.get('store').query('bestuursorgaan', {'filter[bestuurseenheid][id]': bestuurseenheidId });
    const organenInTijd = await Promise.all(bestuursorganen.map(orgaan => this.getLastBestuursorgaanInTijd(orgaan.get('id'))));
    return organenInTijd.filter(orgaan => orgaan);
  },

  getLastBestuursorgaanInTijd: async function(bestuursorgaanId){
    const queryParams = {
      sort: '-binding-start',
      'filter[is-tijdsspecialisatie-van][id]': bestuursorgaanId,
      page: { size: 1 }
    };

    const organen = await this.get('store').query('bestuursorgaan', queryParams);
    return organen.firstObject;
  },

  searchByName: task(function* (searchData) {
    yield timeout(300);
    let queryParams = {
      sort:'naam',
      filter: {
        naam: searchData,
        'bestuursorganen-in-tijd': {
          id: this.get('bestuursorganenId').join(',')
        }
      }
    };
    return yield this.get('store').query('fractie', queryParams);
  }),

  actions: {
    select(fractie){
      this.set('_fractie', fractie);
      this.get('onSelect')(fractie);
    }
  }
});
