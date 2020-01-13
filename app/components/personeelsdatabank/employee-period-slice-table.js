import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'table',
  
  rows: computed('data.employeeObservations.@each.id', function(){
    let columnCoordinates = [{}];
    columnCoordinates = this.generateColumnCoordinates(columnCoordinates, 'workingTimeCategory', this.data.workingTimeCategories.sortBy('label').reverse());
    columnCoordinates = this.generateColumnCoordinates(columnCoordinates, 'legalStatus', this.data.legalStatuses.sortBy('label').reverse());
    columnCoordinates = this.generateColumnCoordinates(columnCoordinates, 'sex', this.data.sexes.sortBy('label'));
    let rows = this.generateRows(this.data.employeeObservations, columnCoordinates, 'educationalLevel', this.data.educationalLevels.sortBy('label'));
    return rows;
  }),

  subTotalRows: computed('data.employeeObservations.@each.value', function(){
    let columnCoordinates = [{}];
    columnCoordinates = this.generateColumnCoordinates(columnCoordinates, 'workingTimeCategory', this.data.workingTimeCategories.sortBy('label').reverse());
    let row_1 = this.calculateSubTotals(this.data.employeeObservations, 'workingTimeCategory', columnCoordinates, 4);
    columnCoordinates = this.generateColumnCoordinates(columnCoordinates, 'legalStatus', this.data.legalStatuses.sortBy('label').reverse());
    let row_2 = this.calculateSubTotals(this.data.employeeObservations, 'legalStatus', columnCoordinates, 2);
    columnCoordinates = this.generateColumnCoordinates(columnCoordinates, 'sex', this.data.sexes.sortBy('label'));
    let row_3 = this.calculateSubTotals(this.data.employeeObservations, 'sex', columnCoordinates);
    return [row_3, row_2, row_1];
  }),

  generateColumnCoordinates(providedColumns, propertyKey, sortedValues){
    const updatedColumns = [];
    for(const col of providedColumns){
      for(const val of sortedValues){
        const templateCol = Object.assign({}, col);
        templateCol[propertyKey] = val;
        updatedColumns.push(templateCol);
      }
    }
    return updatedColumns;
  },

  generateRows(items, providedColumns, propertyKey, sortedValues){
    const rows = [];
    //sortedValues: [niveau 1, niveau 2]
    for(const val of sortedValues){
      const filteredItems = items.filter(i => {
        return i.get(propertyKey).get('id') == val.id;
      });
      const row = [];
      //providedColumns: [{'sex': sexObject, 'tijd': 'halfTijdsObject'}]
      for(const col of providedColumns){
        const cell = filteredItems.find(item => this.itemIsInCell(item, col));
        row.push(cell || {});
      }
      rows.push(row);
    }
    return rows;
  },

  itemIsInCell(item, columnCoordinate){
    for(const key of Object.keys(columnCoordinate)){
      if(item.get(key).get('id') !== columnCoordinate[key].id){ //TODO: assumes relation, clean mix emberObject vs object
        return false;
      }
    }
    return true;
  },

  calculateSubTotals(items, propertyKey, providedColumns, colspan){
    let totals = [];
    for(const col of providedColumns){
      const cells = items.filter(item => this.itemIsInCell(item, col));
      const total = cells.reduce((acc, cell) => {
        return acc + parseFloat(cell.value || 0);
      }, 0);
      totals.push({ total, label: col[propertyKey].get('label'), colspan});
    }
    return totals;
  }
});
