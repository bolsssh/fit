import DS from 'ember-data';

export default DS.Model.extend({
  workout: DS.attr('string'),
  error: DS.attr('number'),
  hintText: DS.attr('string'),
});