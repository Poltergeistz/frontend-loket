import Model, { attr, hasMany } from '@ember-data/model';

export default class WorshipServiceModel extends Model {
  @attr('string') denomination;
  @attr('boolean') crossBorder;

  @hasMany('local-involvement') involvements;
}
