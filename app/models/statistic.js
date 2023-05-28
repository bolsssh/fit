import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  totalDuring: DS.attr('date'),
  totalCount: DS.attr('number'),
  avarageScore: DS.attr('number'),
});