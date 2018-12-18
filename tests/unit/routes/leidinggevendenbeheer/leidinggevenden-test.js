import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | leidinggevendenbeheer/leidinggevenden', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:leidinggevendenbeheer/leidinggevenden');
    assert.ok(route);
  });
});
