import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | subsidiebeheer/subsidies/new-decision', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:subsidiebeheer/subsidies/new-decision');
    assert.ok(route);
  });
});
