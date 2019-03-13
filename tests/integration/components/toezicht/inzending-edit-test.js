import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, pauseTest } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | toezicht/inzending-edit', function(hooks) {
  setupRenderingTest(hooks);

  test('Sending an empty form fails', async function(assert) {
    this.set('model', { 
      formNode: true,
      inzendingVoorToezicht: {
        besluitType: {
          id: 1
        }
      },
      get(p) {
        return this[p];
      }
    });

    await render(hbs`
    {{toezicht/inzending-edit
      model=model
      canSend=true
    }}`);
    await click('[data-test-loket="submit-button"]');
    assert
      .dom('[data-test-loket="warning-message"]')
      .exists('Aandacht wordt getoond als de gebruiker wil een nul vormuleer versturen');
  });
});
