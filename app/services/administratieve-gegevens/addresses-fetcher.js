import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service(),

  async fetchAddresses(fuzzyAddress) {
    const addresses = await this.get('ajax').request(`http://loc.geopunt.be/v3/Location?q=${fuzzyAddress}`, {
        method: 'GET',
      });
    return addresses.LocationResult;
  }
});
