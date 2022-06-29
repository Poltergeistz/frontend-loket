import Model, { attr, belongsTo } from '@ember-data/model';

export default class WorshipMandatoryModel extends Model {
  @attr('date') expectedEndDate;
  @attr('string') reasonStopped;

  @belongsTo('half-election') typeHalf;
}
