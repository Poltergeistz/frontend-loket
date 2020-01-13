import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads }from '@ember/object/computed';

export default Component.extend({
  tagName: 'tr',
  cells: reads('row'),
  total: computed('row.@each.value', function(){
    return this.row.reduce((acc, cell) => {
      return acc + parseFloat(cell.value || 0);
    }, 0);
  })
});
