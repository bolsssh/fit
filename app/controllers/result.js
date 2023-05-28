import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  workout: Ember.inject.controller('workout'),
  model: Ember.computed.reads('workout.result'),
  workoutTime: Ember.computed('model', function() {
    let time = this.get('model.duration'),
      ms = this.zeroPad((time % 1).toFixed(2) * 10 | 0, 2),
      s = this.zeroPad(time % 60 | 0, 2),
      min = this.zeroPad(time / 60 | 0, 2);
    return min + ":" + s + ":" + ms
  }),
  zeroPad(num, places) {
    return String(num).padStart(places, '0')
  },
  
  init() {
    this._super(...arguments);
  }
// model() {
//   return Ember.Object.create({login:'', password:''});
// },  
});
