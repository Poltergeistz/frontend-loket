import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { currentSession, authenticateSession, invalidateSession} from 'ember-simple-auth/test-support';

module('Acceptance | berichtencentrum/berichten', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /berichtencentrum/ without login redirects to /login', async function(assert){
    await visit('/berichtencentrum');

    assert.equal(currentURL(), '/login');
  });
});
