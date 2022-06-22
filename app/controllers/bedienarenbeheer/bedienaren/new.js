import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BedienarenbeheerBedienarenNewController extends Controller {
  @service() router;

  @action
  selectPersoon(persoon) {
    this.router.transitionTo(
      'bedienarenbeheer.bedienaren.edit',
      persoon.get('id')
    );
  }

  @action
  createNewPerson() {
    this.router.transitionTo('bedienarenbeheer.bedienaren.new-person');
  }

  @action
  cancel() {
    this.router.transitionTo('bedienarenbeheer.bedienaren');
  }
}
