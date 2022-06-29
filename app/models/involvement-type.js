import Model, { attr } from '@ember-data/model';

export default class InvolvementTypeModel extends Model {
  @attr('string') label;
}
