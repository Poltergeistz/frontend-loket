/* eslint-disable ember/no-computed-properties-in-native-classes */

import Component from '@glimmer/component';
import { action, set } from '@ember/object';
// TODO : Fix computed linting error
import { reads } from '@ember/object/computed';
import { conditional, raw } from 'ember-awesome-macros';

export default class EmployeeObservationTableCell extends Component {
  tagName = '';

  isFloat = reads('observation.unitMeasure.isFTE');
  step = conditional('isFloat', raw(0.01), raw(1));

  constructor() {
    super(...arguments);
    if (
      this.args.observations &&
      this.args.unitMeasure &&
      this.args.educationalLevel &&
      this.args.workingTimeCategory &&
      this.args.legalStatus &&
      this.args.sex
    ) {
      const observation = this.args.observations.find(
        (obs) =>
          obs.unitMeasure.get('uri') == this.args.unitMeasure.get('uri') &&
          obs.educationalLevel.get('uri') ==
            this.args.educationalLevel.get('uri') &&
          obs.workingTimeCategory.get('uri') ==
            this.args.workingTimeCategory.get('uri') &&
          obs.legalStatus.get('uri') == this.args.legalStatus.get('uri') &&
          obs.sex.get('uri') == this.args.sex.get('uri')
      );
      set(this, 'observation', observation);
    }
  }

  @action
  setValue(event) {
    if (event.target.value < 0 || event.target.value === '')
      event.target.value = 0;

    if (this.isFloat) {
      const float = Number.parseFloat(event.target.value).toFixed(2);
      this.observation.set('value', float);
    } else {
      const int = Math.ceil(event.target.value);
      this.observation.set('value', int);
    }
    this.args.onChange(this.observation);
  }
}
