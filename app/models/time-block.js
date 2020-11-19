import Model, {attr} from '@ember-data/model';

export default class TimeBlock extends Model {
  @attr('string') label;
  @attr('date') hasStart;
  @attr('date') hasEnd;
}
