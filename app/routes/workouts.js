import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  
  init() {
    this._super(...arguments);
  },
  
  model() {
    return this.store.findAll('workouts').then(x => x.map(workout => {
      let elem = {};
      elem.label = workout.get('name');
      elem.imgSource = workout.get('imgName');
      elem.text = workout.get('description');
      if(elem.label != "Настраиваемая тренировка") {
        elem.route = 'workout';
      }
      else {
        elem.route = 'customworkout';
      }
      return elem
    }));
  },
});
