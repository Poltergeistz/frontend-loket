/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class BedienarenbeheerBedienarenRoute extends Route.extend(
  DataTableRouteMixin
) {
  modelName = 'agentsInPosition';

  mergeQueryOptions() {
    return {
      include: ['is-bestuurlijke-alias-van', 'person'].join(','),
    };
  }
}
