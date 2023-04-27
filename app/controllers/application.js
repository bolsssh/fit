import Ember from 'ember';
//import MenuHelper from 'testing-menu/mixins/menu-helper';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  infa: undefined,
  
  init() {
    this._super(...arguments);
    // let record = this.get('store').findRecord('workouts', '3ac1667e-33e7-420d-a136-7314c62757c7').then(x=>{
    //   console.log(x);
    //   console.log(x.get('name'));
    //   });
    // let record1 = this.get('store').queryRecord('workouts', '3ac1667e-33e7-420d-a136-7314c62757c7').then(x=>{
    //   console.log(x);
    //   console.log(x.get('name'));
    // });

    // console.log(record);
    // console.log(record.get('name'));
    // console.log(record1);
    // console.log(record1.get('name'));
    //
    
    
    this.transitionToRoute('home');
    //let record = this.get('store').findAll('workouts');
    //this.infa=record
  }
});