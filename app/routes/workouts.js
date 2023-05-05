import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  
  init() {
    this._super(...arguments);
    this.store.findAll('workouts');
    console.log("0");
  },
  
  model() {
    let elements = [];
    console.log(this.store.peekAll('workouts'));
    
    this.store.peekAll('workouts').content.forEach((workout) => {
      let elem = {};
      elem.label = workout.__data.name;
      elem.imgSource = 'assets/images/' + workout.__data.imgName;
      elem.text = workout.__data.description;
      elem.route = 'workout';
      elements.push(elem);
      console.log("1");
    })
    
    console.log("2");
    console.log(elements);
    return elements;
  },
});
