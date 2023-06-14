import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  workoutList: [
    { name:'Приседания',
      engName:'Squats' },
    { name:'Отжимание',
      engName:'Push-ups' },
    { name:'Сгибание бицепса',
      engName:'Bicep Curls' },
    { name:'Наклоны вперед',
      engName:'Forward Bends' },
  ],
//   function addExercise() {
//   const exerciseName = exerciseSelectElement.value;
//   const repetitions = parseInt(repetitionsInputElement.value);
//  
//   // Создание нового элемента списка с упражнением
//   const exerciseItem = document.createElement('li');
//   exerciseItem.textContent = `${exerciseName} (${repetitions} repetitions)`;
//  
//   // Добавление элемента списка в список плана тренировки
//   exerciseListElement.appendChild(exerciseItem);
// }
  list: [],
  actions: {
    addExercise() {
      const exerciseName = document.getElementById('exercise').value;
      let repetitions = parseInt(document.querySelector('.repet').value);
      document.querySelector('.repet').value = 1;
      if (isNaN(repetitions)){
        repetitions = 1;
      }
      // Создание нового элемента списка с упражнением
      const exerciseItem = document.createElement('li');
      exerciseItem.textContent = `${ exerciseName } (${ repetitions } повторений)`;
      this.list.push({name: this.workoutList.find(e=>e.name===exerciseName).engName, repetitions: repetitions})
      // Добавление элемента списка в список плана тренировки
      document.getElementById('exercise-list').appendChild(exerciseItem);
    },
    
    start() {
      let thisRouter = this.container.lookup('controller:application');
      thisRouter.transitionToRoute('workout').data= {data: this.list} ;
    },
  }
});