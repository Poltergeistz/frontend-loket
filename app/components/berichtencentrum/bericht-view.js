import Component from '@ember/component';

export default Component.extend({
  isExpanded: false,

  didReceiveAttrs() {
    if (this.bericht.inhoud == '888')
      this.bericht
        .get('bijlagen')
        .then(results => this.set("isExpanded", results.length > 0));
  },

  actions: {
    expand() {
      this.set("isExpanded", !this.isExpanded);
    }
  }
});
