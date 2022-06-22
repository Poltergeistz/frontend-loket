/* eslint-disable ember/no-computed-properties-in-native-classes */
import Controller from '@ember/controller';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BedienarenbeheerBedienarenController extends Controller {
  @service() router;

  @tracked bedienarenbeheer;
  @tracked filter = '';
  @tracked page = 0;
  sort = 'is-bestuurlijke-alias-van.achternaam';
  size = 20;

  get hasActiveChildRoute() {
    return (
      this.router.currentRouteName.startsWith('bedienarenbeheer.bedienaren.') &&
      this.router.currentRouteName != 'bedienarenbeheer.bedienaren.index'
    );
  }

  @alias('bedienarenbeheer.startDate') startDate;
  @alias('bedienarenbeheer.bestuursperioden') bestuursperioden;
  @alias('bedienarenbeheer.bestuurseenheid') bestuurseenheid;
  @alias('bedienarenbeheer.bestuursorganen') bestuursorganen;

  @restartableTask
  *search(searchData) {
    yield timeout(300);
    this.page = 0;
    this.filter = searchData;
  }

  @action
  handleAddMandatarisClick() {
    if (this.router.currentRouteName === 'bedienarenbeheer.bedienaren.new')
      this.router.transitionTo('bedienarenbeheer.bedienaren.index');
    else this.router.transitionTo('bedienarenbeheer.bedienaren.new');
  }

  @action
  handleBeheerFractiesClick() {
    this.router.transitionTo('bedienarenbeheer.fracties');
  }

  @action
  selectPeriod(startDate) {
    this.router.transitionTo('bedienarenbeheer.bedienaren', {
      queryParams: {
        page: 0,
        startDate: startDate,
      },
    });
  }
}
