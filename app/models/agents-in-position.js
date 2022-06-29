import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AgentsInPositionModel extends Model {
  @attr('date') agentStartDate;
  @attr('date') start;
  @attr('date') endDate;

  @belongsTo('persoon') person;
  @belongsTo('persoon', { inverse: 'isAangesteldAls' }) isBestuurlijkeAliasVan;
  @belongsTo('post') position;

  @hasMany('contact-punt') contactinfo;

  get startDate() {
    return this.agentStartDate || this.start || null;
  }

  get persoon() {
    return this.isBestuurlijkeAliasVan || null;
  }

  get voornaam() {
    return (
      this.person.get('gebruikteVoornaam') ||
      this.isBestuurlijkeAliasVan.get('gebruikteVoornaam') ||
      null
    );
  }

  get achternaam() {
    return (
      this.person.get('achternaam') ||
      this.isBestuurlijkeAliasVan.get('achternaam') ||
      null
    );
  }
}
