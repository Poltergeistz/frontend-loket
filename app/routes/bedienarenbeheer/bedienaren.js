/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class BedienarenbeheerBedienarenRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service store;

  modelName = 'bedienaar';

  beforeModel() {
    const bedienarenbeheer = this.modelFor('bedienarenbeheer');
    this.bedienarenbeheer = bedienarenbeheer;
  }

  mergeQueryOptions(params) {
    const bestuursorganenIds = this.bedienarenbeheer.bestuursorganen.map((o) =>
      o.get('id')
    );

    const queryParams = {
      sort: params.sort,
      filter: {
        bekleedt: {
          'bevat-in': {
            id: bestuursorganenIds.join(','),
          },
        },
      },
      include: ['is-bestuurlijke-alias-van', 'bekleedt.bestuursfunctie'].join(
        ','
      ),
    };

    if (params.filter) {
      queryParams['filter']['is-bestuurlijke-alias-van'] = params.filter;
    }

    return queryParams;
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.searchData = this.paramsFor('bedienarenbeheer.bedienaren')[
      'filter'
    ];
    controller.bedienarenbeheer = this.bedienarenbeheer;
  }

  @action
  reloadModel() {
    this.refresh();
  }
}
