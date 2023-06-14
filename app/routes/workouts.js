import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  workoutData: undefined,
  workoutList: [
    { name:'Приседание',
      engName:'Squats' },
    { name:'Отжимания',
      engName:'Push-ups' },
    { name:'Сгибания бицепса',
      engName:'Bicep Curls' },
    { name:'Наклоны вперед',
      engName:'Forward Bends' },
  ],
  model() {
    return this.store.findAll('workouts').then(x => x.map(workout => {
      let elem = {};
      elem.label = workout.get('name');
      elem.imgSource = workout.get('imgName');
      elem.text = workout.get('description');
      if(elem.label != "Настраиваемая тренировка") {
        elem.data = [{name:this.workoutList.find(e=>e.name===elem.label).engName, repetitions:5}]
        elem.route = 'workout';
      }
      else {
        elem.route = 'customworkout';
      }
      return elem
    }));
  },
});
