import Component from '@ember/component';
import { computed } from '@ember/object';
export default Component.extend({
  subjectsString: computed('employeeDataset.subjects.@each.id', function(){
    return this.get('employeeDataset.subjects').reduce((acc, s) => {
      acc += `${s.label} `;
      return acc;
    }, '');
  }),

  latestPeriod: computed('employeeDataset.periods.@each.id', function(){
    const periods = this.get('employeeDataset.periods');
    return periods.sortBy('-employeeTimePeriod.start').firstObject;
  })
});
