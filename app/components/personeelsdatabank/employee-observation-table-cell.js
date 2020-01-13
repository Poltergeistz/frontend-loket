import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.observations && this.unitMeasure && this.educationalLevel && this.workingTimeCategory && this.legalStatus && this.sex) {
      const observation = this.observations.find(obs => obs.unitMeasure.get('uri') == this.unitMeasure.get('uri')
                                                 && obs.educationalLevel.get('uri') == this.educationalLevel.get('uri')
                                                 && obs.workingTimeCategory.get('uri') == this.workingTimeCategory.get('uri')
                                                 && obs.legalStatus.get('uri') == this.legalStatus.get('uri')
                                                 && obs.sex.get('uri') == this.sex.get('uri'));
      this.set('observation', observation);
    }
  }
});
