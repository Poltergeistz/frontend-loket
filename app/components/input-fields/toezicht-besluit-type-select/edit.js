import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { debug } from '@ember/debug';

export default Component.extend({
  currentSession: service(),
  store: service(),

  allowClear: true,
  disabled: false,
  displayProperty: 'label',

  async init() {
    this._super(...arguments);

    const options = await this.search.perform();
    this.set('options', options);
  },

  async didReceiveAttrs(){
    this._super(...arguments);

    if (this.get('model')) {
      let value = await this.get(`solution.${this.get('model.identifier')}`);

      if (value && value.get('isNew')) { // only already existing options are allowed
        debug(`Reset value of toezicht-besluit-type-select to null`);
        value.destroyRecord();
        value = null;
      }

      this.set('object_instance', value);
    }
  },

  search: task(function* (searchData){
    if (searchData)
      yield timeout(300);

    const bestuurseenheid = yield this.get('currentSession.group');
    const classificatie = yield bestuurseenheid.get('classificatie');
    const queryParams = {
      sort: 'label',
      'filter[decidable-by][id]': classificatie.get('id')
    };

    if (searchData)
      queryParams['filter[label]'] = searchData;

    const resources = yield this.get('store').query('besluit-type', queryParams);
    return resources;
  }).keepLatest(),

  actions: {
    select(object_instance){
      this.set('object_instance', object_instance);
      const prop = this.get('model.identifier');
      this.set(`solution.${prop}`, object_instance);
    }
  }

});
