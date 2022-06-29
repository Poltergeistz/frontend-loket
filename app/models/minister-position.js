import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class MinisterPositionModel extends Model {
  @belongsTo('function') function;
  @belongsTo('worship-service') worshipService;

  @hasMany('minister') heldBy;
}
