import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import session from '../../helpers/session';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | berichtencentrum/berichten', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const classificatieCode = this.server.create('bestuurseenheid-classificatie-code', {
      label: "Gemeente",
      scopeNote: undefined,
      uri: "http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001"
    });

    const bestuurseenheidAalst = this.server.create('bestuurseenheid', {
      classificatie: classificatieCode,
      mailAdres: "bestuursondersteuning@aalst.Be",
      naam: "Aalst",
      politiezone: null,
      primaireSite: null,
      werkingsgebied: null,
      wilMailOntvangen: true
    });

    const bestuurseenheidABB = this.server.create('bestuurseenheid', {
      classificatie: null,
      mailAdres: null,
      naam: "Agentschap Binnenlands Bestuur",
      politiezone: null,
      primaireSite: null,
      werkingsgebied: null,
      wilMailOntvangen: false
    });

    const file = this.server.create('file', {
      created: null,
      extension: "pdf",
      filename: "20190208_CBS_Aalst_2019.000053.pdf",
      format: "application/pdf; charset=binary",
      size: 455122,
      uri: "http://mu.semte.ch/services/file-service/files/5c5d94ee76f162000d000000"
    });

    const bericht = this.server.create('bericht', {
      aangekomen: "2019-02-08T00:00:00.000Z",
      auteur: null,
      bijlagen: [ file ],
      inhoud: null,
      naar: null,
      van: bestuurseenheidABB,
      verzonden: "2019-02-08T00:00:00.000Z"
    });

    this.server.create('conversatie', {
      betreft: "KLACHT2019.000053 tegen Stad  Aalst: antwoord aan bestuur",
      dossiernummer: "KLACHT2019.000053",
      laatsteBericht: bericht,
      reactietermijn: "P31D",
      typeCommunicatie: "Kennisname toezichtsbeslissing"
    });

    this.server.create('gebruiker', {
      achternaam: "Aalst",
      bestuurseenheden: [ bestuurseenheidAalst ],
      rijksregisterNummer: undefined,
      voornaam: "Gemeente"
    });
  });

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

  test('clicking on the button to set a receiver email shows the bericht-notificatie-voorkeuren component', async function(assert){
    await session( this.server );

    await visit('/berichtencentrum/berichten');
    await click('[data-test-loket=berichtencentrum-setting-email-button]');

    assert.dom(`[data-test-loket=setting-email-component]`).exists();
  });

  test('visiting /berichtencentrum/ shows an ember-data-table', async function(assert){
    await session( this.server );

    await visit('/berichtencentrum/berichten');

    assert.dom(`[data-test-loket=berichtencentrum-table]`).exists();
  });

  test('the table at visiting /berichtencentrum/ has exactly one row', async function(assert){
    await session( this.server );

    await visit('/berichtencentrum/berichten');

    assert.dom(`[data-test-loket=berichtencentrum-body]>tr`).exists({ count: 1 });
  });

  test('clicking on "Bekijk" shows a conversatie', async function(assert){
    await session( this.server );

    await visit('/berichtencentrum/berichten');
    await click('[data-test-loket=berichtencentrum-bekijk]:first-of-type');

    assert.dom(`[data-test-loket=berichtencentrum-conversatie]`).exists();
  });
});
