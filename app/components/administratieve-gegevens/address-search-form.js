import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  addressesFetcher: service('administratieve-gegevens/addresses-fetcher'),
  address: "",

  search: task(function* (term) {
    yield timeout(600);
    const addresses = yield this.addressesFetcher.fetchAddresses(term);
    return addresses;
  }),

  actions: {
    select(address){
      this.set('address', address);
    }
  }
});
