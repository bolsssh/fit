import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  init() {
    if(!this.session.isAuthenticated){
      let appController = this.container.lookup('controller:application');
      appController.transitionToRoute('login');
    }
  },
});
