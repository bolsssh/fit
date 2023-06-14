import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  setupController(controller, model)
  {
    controller.set('model', model);
    controller.set('exerciseList', this.get('exerciseList'));
  },
  
  beforeModel(transition) {
    this.set('exerciseList', transition.data['data'])
  },
  
  afterModel(model, transition) {
    Ember.run.schedule("afterRender", this, function() {
      this.controllerFor('workout').send('didRender');
    });
  }
});
