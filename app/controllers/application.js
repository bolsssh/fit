import Ember from 'ember';
//import MenuHelper from 'testing-menu/mixins/menu-helper';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  currentUser: undefined,
  
  init() {
    this._super(...arguments);
    this.transitionToRoute('home');
  },
  
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
      let appController = this.container.lookup('controller:application');
      appController.transitionToRoute('login');
    }
  }
});