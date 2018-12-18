import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | leidinggevendenbeheer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:leidinggevendenbeheer');
    assert.ok(route);
  });
});
