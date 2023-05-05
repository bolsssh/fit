import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [ {
      label: 'Настройки',
      imgSource: 'assets/images/options.svg',
      text: 'Редактирование личного кабинета',
      route: 'options'
    }, {
      label: 'Тренировки',
      imgSource: 'assets/images/sport.svg',
      text: 'Выберети уникальную программу тренировки',
      route: 'workouts'
    }, {
      label: 'Достижения',
      imgSource: 'assets/images/results.svg',
      text: 'Ваши достижения',
      route: 'achievments'
    } ]
  },
});
