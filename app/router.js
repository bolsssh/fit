import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: '/'
});

Router.map(function() {
  this.route('register');
  this.route('home');
  this.route('login');
  this.route('workouts');
  this.route('workout');
});

export default Router;
