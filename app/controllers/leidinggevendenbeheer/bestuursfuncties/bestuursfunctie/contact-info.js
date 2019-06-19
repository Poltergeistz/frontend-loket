import Controller from '@ember/controller';

export default Controller.extend({
  newAddressData: null,
  dataIsGettingLost: false,
  
  exit() {
    this.transitionToRoute('leidinggevendenbeheer.bestuursfuncties.bestuursfunctie.functionarissen', this.bestuursfunctie.id);
  },

  /**
   * This method will do the housekeeping
   * It will reset any any unneeded internal state of the controller
   */
  reset() {
    this.set('newAdressData', null);
    this.set('dataIsGettingLost', false);
  },
  
  async saveData(){
    if(this.newAddressData){
      this.model.setProperties(this.newAddressData);
    }
    await this.model.save();
  },

  actions: {
    /**
     * This action is called for saving to the data store
     * and navigating back to the bestuurfuncties list.
     * It is triggered with either the 'Bewaar contactgegeven' button in the main UI
     * or the 'Bewaar' button in the close confirmation dialog
     */
    async bewaar() {
      await this.saveData();
      this.exit();
    },

    /**
     * This action is called when the close button on the top right side 
     * of the UI is clicked
     */
    async gentleCancel(){
      this.set('dataIsGettingLost', (await this.model.hasDirtyAttributes) || this.newAddressData);
      if (! this.dataIsGettingLost)
        this.exit();
    },

    /**
     * This action is called when the 'Verwerp wijzigingen' button is clicked
     * either in the main UI or in the close confirmation dialog
     */
    async immediateCancel() {
      this.model.rollbackAttributes();
      this.exit();
    },

    addressSelected(addressData){
      this.set('newAddressData', addressData);
    }
  }
});
