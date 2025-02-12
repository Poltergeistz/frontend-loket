/* eslint-disable ember/no-computed-properties-in-native-classes */
import Controller from '@ember/controller';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MandatenbeheerMandatarissenController extends Controller {
  @service() router;

  @tracked mandatenbeheer;
  @tracked filter = '';
  @tracked page = 0;
  sort = 'is-bestuurlijke-alias-van.achternaam';
  size = 20;

  get hasActiveChildRoute() {
    return (
      this.router.currentRouteName.startsWith(
        'mandatenbeheer.mandatarissen.'
      ) && this.router.currentRouteName != 'mandatenbeheer.mandatarissen.index'
    );
  }

  @alias('mandatenbeheer.startDate') startDate;
  @alias('mandatenbeheer.bestuursperioden') bestuursperioden;
  @alias('mandatenbeheer.bestuurseenheid') bestuurseenheid;
  @alias('mandatenbeheer.bestuursorganen') bestuursorganen;

  @restartableTask
  *search(searchData) {
    yield timeout(300);
    this.page = 0;
    this.filter = searchData;
  }

  @action
  handleAddMandatarisClick() {
    if (this.router.currentRouteName === 'mandatenbeheer.mandatarissen.new')
      this.router.transitionTo('mandatenbeheer.mandatarissen.index');
    else this.router.transitionTo('mandatenbeheer.mandatarissen.new');
  }

  @action
  handleBeheerFractiesClick() {
    this.router.transitionTo('mandatenbeheer.fracties');
  }

  @action
  selectPeriod(startDate) {
    this.router.transitionTo('mandatenbeheer.mandatarissen', {
      queryParams: {
        page: 0,
        startDate: startDate,
      },
    });
  }
}
