import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';
export default Controller.extend({

  isBusy: computed('save.isRunning', 'cancel.isRunning', function(){
    return this.save.isRunning || this.cancel.isRunning;
  }),

  requiresFTEMsg: computed('model.unitMeasures.@each.id', function(){
    return this.model.unitMeasures.find(um => um.uri == 'http://lblod.data.gift/concepts/a97325c1-f572-4dd8-8952-c2cb254f114a');
  }),

  save: task(function * (model){
    const observations = (yield model.employeeObservations).toArray();
    for(const ob of observations){
      if(ob.hasDirtyAttributes){
        yield ob.save();
      }
    }
    const dataset = yield model.periode.get('dataset');
    dataset.set('modified', new Date());
    yield dataset.save();
  }),

  cancel: task(function *(model){
    const observations = (yield model.employeeObservations).toArray();
    for(const ob of observations){
      if(ob.hasDirtyAttributes){
        ob.rollbackAttributes();
      }
    }
  }),

  actions: {
    save(model){
      this.save.perform(model);
    },

    cancel(model){
      this.cancel.perform(model);
    }
  }
});
