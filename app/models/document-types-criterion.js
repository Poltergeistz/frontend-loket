import Model, { attr } from '@ember-data/model';

export default class DocumentTypesCriterionModel extends Model {
  @attr('string') label;
}
