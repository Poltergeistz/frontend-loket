import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | subsidiebeheer/subsidies-beschikbaar/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:subsidiebeheer/subsidies-beschikbaar/index');
    assert.ok(route);
  });
});
