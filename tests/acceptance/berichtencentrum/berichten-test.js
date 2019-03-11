import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | berichtencentrum/berichten', function(hooks) {
  setupApplicationTest(hooks);



  test('visiting /berichtencentrum/berichten', async function(assert) {
    await visit('/berichtencentrum/berichten');

    assert.equal(currentURL(), '/berichtencentrum/berichten');
  });
});
