import DS from 'ember-data';
import config from '../config/environment';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: config.backendURL,
  session: Ember.inject.service(),
  
  headers: Ember.computed('session.isAuthenticated', 'session.data.authenticated.token', function() {
    if (this.get('session.isAuthenticated')) {
       return {
         'Authorization': `Bearer ${this.get('session.data.authenticated.token')}`
       }
    } 
  }),
})
