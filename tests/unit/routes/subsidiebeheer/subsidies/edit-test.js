import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | subsidiebeheer/subsidies/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:subsidiebeheer/subsidies/edit');
    assert.ok(route);
  });
});
