import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  setupController(controller, model)
  {
    controller.set('model', model);
    controller.set('exerciseList', this.get('exerciseList'));
    //controller.set('options', transition.data);
    //you can do anything with controller and model instance
  },
  
  beforeModel(transition) {
    //this.controller.set('exerciseList', transition.data['exerciseList'])
    this.set('exerciseList', transition.data['data'])
    // Set a data property on the transition object
    //transition.data['myData'] = { foo: 'bar' };
  },
  
  afterModel(model, transition) {
    Ember.run.schedule("afterRender", this, function() {
      this.controllerFor('workout').send('didRender');
    });
  }
});
