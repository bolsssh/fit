import Ember from 'ember';

export default Ember.Component.extend({
  label: '',
  text: '',
  route: undefined,
  imgSource: undefined,
  customClassName:'',
  /**
   Array CSS class names.
   [More info.](http://emberjs.com/api/classes/Ember.Component.html#property_classNames)
   
   @property classNames
   @type Array
   @readOnly
   */
  classNames: [ 'panel' ],
  
  init(){
    this._super(...arguments);
    this.classNames.push(this.customClassName);
  },
  
  click() {
    if (!this.$().hasClass('active-panel')) {
      $('.active-panel').removeClass('active-panel');
      this.$().addClass('active-panel');
    }
    else {
      let thisRouter = this.container.lookup('controller:application');
      thisRouter.transitionToRoute(this.route);
    }
  },
  
  actions: {}
});
