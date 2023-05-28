import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  
  actions: {
    authenticate() {
      let {
        login,
        password
      } = this.getProperties('login', 'password');
      let thisRouter = this.container.lookup('controller:application');
      this.get('session')
      .authenticate('authenticator:jwt', login, password)
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      }).then((result)=>{
        if (this.get('session.isAuthenticated')) {
          thisRouter.currentUser = login;
          thisRouter.transitionToRoute('home');
        }
      });
    }
  }
});