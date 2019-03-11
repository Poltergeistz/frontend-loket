import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import session from '../../helpers/session';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | berichtencentrum/berichten', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /berichtencentrum/ without login redirects to /login', async function(assert){
    await visit('/berichtencentrum');

    assert.equal(currentURL(), '/login');
  });

  test('visiting /berichtencentrum/ with login shows berichtencentrum', async function(assert){
    await session( this.server );

    await visit('/berichtencentrum/');

    assert.ok(currentURL().startsWith("/berichtencentrum"));
  });

  test('visiting /berichtencentrum/ with only berichten access shows berichtencentrum', async function(assert){
    await session( this.server, { roles: ["LoketLB-berichtenGebruiker"] } );

    await visit('/berichtencentrum/');

    assert.ok(currentURL().startsWith("/berichtencentrum"));
  });

  test('visiting /berichtencentrum/ with incorrect access rights does not show berichtencentrum', async function(assert){
    await session( this.server, { roles: ["LoketLB-bbcdrGebruiker"] } );

    await visit('/berichtencentrum/');

    assert.notOk(currentURL().startsWith("/berichtencentrum"));
  });

});
