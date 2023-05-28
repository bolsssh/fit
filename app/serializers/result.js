import DS from "ember-data";

export default DS.JSONSerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(...arguments);
    return json;
  },
  
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let test =  this._super(...arguments);
    return test;
  },
});