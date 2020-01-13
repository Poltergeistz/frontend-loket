import Component from '@ember/component';
import { computed } from '@ember/object';
export default Component.extend({
  latestPeriod: computed('employeeDataset.periods.@each.id', function(){
    const periods = this.get('employeeDataset.periods');
    return periods.sortBy('-employeeTimePeriod.start').firstObject;
  })
});
