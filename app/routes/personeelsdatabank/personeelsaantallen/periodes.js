import Route from '@ember/routing/route';

export default Route.extend({

  async model(params){
    const periode = await this.store.find('employee-period-slice', params.employee_period_slice_id);
    const unitMeasures = await periode.get('dataset.subjects');
    const employeeObservations = await this.store.query('employee-observation',
                                                        {include: 'unit-measure,educational-level,sex,working-time-category,legal-status,slice',
                                                         'filter[slice][id]': periode.id,
                                                         'page[size]': 100
                                                        });
    const sexes = await this.store.query('geslacht-code', {
      'filter[id]': '5ab0e9b8a3b2ca7c5e000029,5ab0e9b8a3b2ca7c5e000028' //vrouwelijk, mannelijk
    });
    const workingTimeCategories = await this.store.findAll('working-time-category');
    const legalStatuses = await this.store.findAll('employee-legal-status');
    const educationalLevels = await this.store.findAll('educational-level');
    return {periode, sexes, workingTimeCategories, legalStatuses, educationalLevels, employeeObservations, unitMeasures};
  }
});
