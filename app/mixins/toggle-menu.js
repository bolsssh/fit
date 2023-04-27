import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'a',
  
  menuProgressService: null,
  menuProgress: Ember.computed.alias('menuProgressService.menuProgress'),
  speed: 0.04,
  slidingMenu: 'sliding-menu',
  $slidingMenu: null,
  
  click: function() {
    this.$slidingMenu = Ember.$('.' + this.get('slidingMenu'));
    this.speed = this.get('menuProgress') === -1 ? Math.abs(this.get('speed')) : -Math.abs(this.get('speed'));
    this.$slidingMenu.css({ visibility: 'visible' });
    requestAnimationFrame(this.updateMenuProgress.bind(this));
  },
  
  updateMenuProgress: function() {
    var newProgress = Math.min(Math.max(-1, this.get('menuProgress') + this.speed), 0);
    
    this.menuProgressService.updateProgress(newProgress);
    if (newProgress !== 0 && newProgress !== -1) {
      requestAnimationFrame(this.updateMenuProgress.bind(this));
    } else if (newProgress === 0) {
      this.$slidingMenu.css({ visibility: 'hidden' });
    }
  }
});