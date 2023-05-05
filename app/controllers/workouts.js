import Ember from 'ember';

export default Ember.Controller.extend({  
   store: Ember.inject.service(),
  
  init(){
    this._super(...arguments);
    // let record = this.get('store').findAll('workouts').then(x=> {
    //     this.infa = x
    //   });
    //this.infa=record
  }
});
