import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  afterModel() {
    Ember.run.schedule("afterRender", this, function() {
      this.controllerFor('workout').send('didRender');
    });
  }
});
