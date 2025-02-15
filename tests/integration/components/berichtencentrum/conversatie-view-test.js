import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module(
  'Integration | Component | berichtencentrum/conversatie-view',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      const classificatieCode = {
        label: 'Gemeente',
        scopeNote: undefined,
        uri: 'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001',
      };

      const bestuurseenheidAalst = {
        classificatie: classificatieCode,
        mailAdres: 'bestuursondersteuning@aalst.Be',
        naam: 'Aalst',
        politiezone: null,
        primaireSite: null,
        werkingsgebied: null,
        wilMailOntvangen: true,
      };

      const bestuurseenheidABB = {
        classificatie: null,
        mailAdres: null,
        naam: 'Agentschap Binnenlands Bestuur',
        politiezone: null,
        primaireSite: null,
        werkingsgebied: null,
        wilMailOntvangen: false,
      };

      const file = EmberObject.create({
        created: null,
        extension: 'pdf',
        filename: '20190208_CBS_Aalst_2019.000053.pdf',
        format: 'application/pdf; charset=binary',
        size: 455122,
        uri: 'http://mu.semte.ch/services/file-service/files/5c5d94ee76f162000d000000',
      });

      const bericht = {
        aangekomen: '2019-02-08T00:00:00.000Z',
        auteur: null,
        bijlagen: [file],
        inhoud: null,
        naar: null,
        van: bestuurseenheidABB,
        verzonden: '2019-02-08T00:00:00.000Z',
      };

      const model = {
        classificatieCode: {
          label: 'Gemeente',
          scopeNote: undefined,
          uri: 'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001',
        },

        bijlagen: [file],

        berichten: [
          {
            aangekomen: '2019-02-08T00:00:00.000Z',
            auteur: null,
            bijlagen: [file],
            inhoud: null,
            naar: null,
            van: bestuurseenheidABB,
            verzonden: '2019-02-08T00:00:00.000Z',
          },
        ],

        conversatie: {
          betreft: 'KLACHT2019.000053 tegen Stad  Aalst: antwoord aan bestuur',
          dossiernummer: 'KLACHT2019.000053',
          laatsteBericht: bericht,
          reactietermijn: 'P31D',
          typeCommunicatie: 'Kennisname toezichtsbeslissing',
        },

        gebruiker: {
          achternaam: 'Aalst',
          bestuurseenheden: [bestuurseenheidAalst],
          rijksregisterNummer: undefined,
          voornaam: 'Gemeente',
        },
      };

      this.set('model', model);

      mockCurrentSessionGroup(this.owner);
    });

    test('the component renders a header, a conversatie and a button', async function (assert) {
      this.close = () => {};

      await render(
        hbs`<Berichtencentrum::ConversatieView
          @model={{this.model}}
          @close={{this.close}}
          data-test-loket="berichtencentrum-conversatie"
        />`
      );

      assert
        .dom(`[data-test-loket=berichtencentrum-conversatie-header]`)
        .exists();
      assert.dom(`[data-test-loket=berichtencentrum-conversatie]`).exists();
      assert
        .dom(`[data-test-loket="berichtencentrum-conversatie-button"]`)
        .exists();
    });

    test('the conversatie has exactly one message', async function (assert) {
      this.close = () => {};

      await render(
        hbs`<Berichtencentrum::ConversatieView
          @model={{this.model}}
          @close={{this.close}}
          data-test-loket="berichtencentrum-conversatie"
        />`
      );

      assert
        .dom(`[data-test-loket=berichtencentrum-bericht-view]`)
        .exists({ count: 1 });
    });
  }
);

function mockCurrentSessionGroup(owner) {
  let currentSession = owner.lookup('service:current-session');
  currentSession.group = { id: '1234' };
}
