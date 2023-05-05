import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  password: DS.attr('string'),
  age: DS.attr('number', { defaultValue: 0 }),
  height: DS.attr('number', { defaultValue: 0 }),
  weight: DS.attr('number', { defaultValue: 0 }),
});