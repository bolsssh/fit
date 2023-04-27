import Ember from 'ember';

export default Ember.Route.extend({
  
  store: Ember.inject.service(),
  
  beforeModel: function () {
    // let record = this.get('store').findRecord('workouts', '3ac1667e-33e7-420d-a136-7314c62757c7').then(x=>{
    //   console.log('прогруз');
    //   console.log(x);
    //   console.log(x.get('name'));
    //   });
    
    // let a = this.store.findAll('workouts');
    // console.log(1);
    // console.log(a);
    // return a
    
    //let record = this.get('store').findRecord('workouts', '3ac1667e-33e7-420d-a136-7314c62757c7')
    //let record1 = this.get('store').findRecord('workouts', '3970097a-a13f-46fa-871e-dbe38f231107')
  },  
  
  model() {
    return this.store.findAll('workouts');
    // console.log('all');
    // console.log(a);
    // return a
  },
});
