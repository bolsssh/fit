import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  
  actions: {
  },
});