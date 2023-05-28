import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [ {
      label: 'Тренировки',
      imgSource: 'sport.svg',
      text: 'Выберети уникальную программу тренировки',
      route: 'workouts'
    }, {
      label: 'Профиль',
      imgSource: 'options.svg',
      text: 'Редактирование личного кабинета',
      route: 'profile'
    }, {
      label: 'Достижения',
      imgSource: 'results.svg',
      text: 'Ваши достижения',
      route: 'achievments'
    } ]
  },
});
