import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BedienarenbeheerBedienarenEditController extends Controller {
  @service() router;

  @action
  saveMandataris() {
    this.send('reloadModel');
  }

  @action
  finish() {
    this.router.transitionTo('bedienarenbeheer.bedienaren');
  }
}
