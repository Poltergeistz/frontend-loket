import Route from '@ember/routing/route';

export default Route.extend({
  async model(params) {
    return this.store.createRecord('functionaris', {
      bekleedt: this.modelFor('leidinggevendenbeheer.bestuursfuncties.bestuursfunctie'),
      isBestuurlijkeAliasVan: await this.store.findRecord('persoon', params.persoon_id)
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controller.reset();
  }
});