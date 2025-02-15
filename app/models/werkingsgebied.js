import Model, { attr, hasMany } from '@ember-data/model';

export default class WerkingsgebiedModel extends Model {
  @attr uri;
  @attr naam;
  @attr niveau;
  @hasMany('bestuurseenheid', { inverse: 'werkingsgebied' }) bestuurseenheid;

  get longName() {
    let niveau = this.niveau;
    let naam = this.naam;
    return `${naam} (${niveau})`;
  }

  rdfaBindings = {
    class: 'prov:Location',
    naam: 'rdfs:label',
  };
}
