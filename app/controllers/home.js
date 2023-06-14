import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  init() {
    this._super(...arguments)
    if(!this.get('session.isAuthenticated')){
      let appController = this.container.lookup('controller:application');
      appController.transitionToRoute('login');
    }
  },
});
