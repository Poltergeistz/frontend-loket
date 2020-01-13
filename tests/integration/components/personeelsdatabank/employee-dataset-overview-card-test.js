import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | personeelsdatabank/employee-dataset-overview-card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{personeelsdatabank/employee-dataset-overview-card}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#personeelsdatabank/employee-dataset-overview-card}}
        template block text
      {{/personeelsdatabank/employee-dataset-overview-card}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
