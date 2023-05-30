import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  setupController(controller,model)
  {
    controller.set('model', model);
    //controller.set('options', transition.data);
    //you can do anything with controller and model instance
  },
  
  beforeModel(transition) {
    console.log(transition.data['list']);
    // Set a data property on the transition object
    //transition.data['myData'] = { foo: 'bar' };
  },
  
  afterModel(model, transition) {
    Ember.run.schedule("afterRender", this, function() {
      this.controllerFor('workout').send('didRender');
    });
  }
});
