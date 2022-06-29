import Model, { attr, belongsTo } from '@ember-data/model';

export default class MinisterConditionModel extends Model {
  @attr('boolean') satisfied;

  @belongsTo('minister-condition-criterion') condition;
  @belongsTo('document-types-criterion') documentType;
}
