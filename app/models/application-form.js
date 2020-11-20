import Model, {attr, belongsTo} from '@ember-data/model';

export default class Subsidy extends Model {
  @attr() uri;
  @attr('datetime', {
    defaultValue(){ return new Date();}
  }) created;

  @attr('datetime', {
    defaultValue(){ return new Date();}
  }) modified;

  @attr('number') aangevraagdBedrag;
  @attr('date') aanvraagdatum;
  @attr('boolean') canBePaidOnKnownBankAccount;


  @belongsTo('contact-punt') contactinfo; // default needed
  @belongsTo('bank-account') bankAccount; // default needed
  @belongsTo('time-block') timeBlock; // default needed

  @belongsTo('bestuurseenheid') organization;
  @belongsTo('submission-document-status') status;
  @belongsTo('gebruiker') creator;
  @belongsTo('gebruiker') lastModifier;
}
