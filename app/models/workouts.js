import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  level: DS.attr('number'),
  imgName: DS.attr('string'),
});
