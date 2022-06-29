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
  sort = '';
  size = 20;
}
