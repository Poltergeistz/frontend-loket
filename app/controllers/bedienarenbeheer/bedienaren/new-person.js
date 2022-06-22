import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BedienarenbeheerBedienarenNewPersonController extends Controller {
  @service() router;

  @action
  onCreate(user) {
    this.router.transitionTo(
      'bedienarenbeheer.bedienaren.edit',
      user.get('id')
    );
  }

  @action
  onCancel() {
    this.router.transitionTo('bedienarenbeheer.bedienaren.new');
  }
}
