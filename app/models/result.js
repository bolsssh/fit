import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  duration: DS.attr('string'),
  score: DS.attr('number'),
});