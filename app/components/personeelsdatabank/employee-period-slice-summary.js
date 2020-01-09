import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  calcTotals: task(function*(){
    const legalStatuses = (yield this.store.findAll('working-time-category')).toArray();
    const observations = yield this.store.query('employee-observation',
                                                        {include: 'working-time-category',
                                                         'filter[slice][id]': this.period.id,
                                                         'page[size]': 100
                                                        });
    const summary = [];
    for(const status of legalStatuses){
      const obs = observations.filter(o => o.get('workingTimeCategory.uri') == status.uri);
      const total = obs.reduce((acc, obs) => { return acc + parseFloat(obs.value || 0); }, 0);
      summary.push({total, label: status.label });
    }

    this.set('summary', summary);
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if(this.period) this.calcTotals.perform();
  }
});
