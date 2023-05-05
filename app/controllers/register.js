import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  
  init() {
    this._super(...arguments);
  },
  
  validateUser(user) {
    if(user.get('login') === undefined) {
      this.set('errorMessage', 'Логин обязателен');
      return false;
    }
    if (user.get('password') !== user.get('passwordConfirmation')) {
      this.set('errorMessage', 'Пароли не совпадают');
      return false;
    }
    // let exist = this.store.query('user', {
    //   filter: {
    //     login: user.get('login')
    //   }
    // })
    // if(exist !== undefined) {
    //   this.set('errorMessage', 'Пользователь уже существует');
    //   return false;
    // }
    return true;
  },
  
  actions: {
    save(user) {
      if (!this.validateUser(user))
        return;
      let thisRouter = this.container.lookup('controller:application'),
        record = this.store.createRecord('user', {
          login: user.get('login'),
          password: user.get('password'),
          age: user.get('age'),
          height: user.get('height'),
          weight: user.get('weight'),
        });
      record.save().catch((error) => {
         if (error && error.errors && error.errors[0].status == 500) {
          console.log(500)
          this.set('errorMessage', 'Пользователь уже существует')
          return;
        }
        this.set('errorMessage', error)
      })
      .then(() => {
        this.get('session')
        .authenticate('authenticator:jwt',
          record.get('login'), record.get('password'))
        .catch((reason) => {
          this.set('errorMessage', reason.error || reason);
        })
        if (this.get('session.isAuthenticated')) {
          thisRouter.transitionToRoute('home');
        }
      })
    }
  },
});
