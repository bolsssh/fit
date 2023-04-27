import Ember from 'ember';
import ToggleMenuMixin from 'core/mixins/toggle-menu';
import { module, test } from 'qunit';

module('Unit | Mixin | toggle menu');

// Replace this with your real tests.
test('it works', function(assert) {
  let ToggleMenuObject = Ember.Object.extend(ToggleMenuMixin);
  let subject = ToggleMenuObject.create();
  assert.ok(subject);
});
