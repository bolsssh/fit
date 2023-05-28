import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  user: undefined,
  
  init() {
    this._super(...arguments);
    this.user = this.getModel();
  },
  
  getModel() {
    let appController = this.container.lookup('controller:application');
    return this.get('store').findRecord('user', appController.currentUser);
  },
  
  actions: {
    submit() {
      this.get('user').then(result =>
        result.save()
      );
      let appController = this.container.lookup('controller:application');
      appController.transitionToRoute('home');
    },
  },
});