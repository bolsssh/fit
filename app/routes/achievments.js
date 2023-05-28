import Ember from 'ember';

export default Ember.Route.extend({
model(){
  let appController = this.container.lookup('controller:application');
  return this.get('store').findRecord('statistic', appController.currentUser);
}
});
