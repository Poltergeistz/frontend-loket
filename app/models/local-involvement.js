import Model, { attr, belongsTo } from '@ember-data/model';

export default class LocalInvolvementModel extends Model {
  @attr('number') percentage;

  @belongsTo('involvement-type') involvementType;
  @belongsTo('worship-service') worshipService;
  @belongsTo('bestuurseenheid') administrativeUnit;
}
