import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  list: undefined,
  index: 0,
  imgPrefix: 'assets/images/',
  init() {
    this._super(...arguments);
    // this.list = [ {
    //   label: 'Apple',
    //   imgSource: 'assets/images/sport.svg',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    //     'sed do eiusmod tempor incididunt ut labore et ' +
    //     'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    //   route: '',
    // }
    // , {
    //   label: 'Banana',
    //   imgSource: 'assets/images/sport.svg',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    //     'sed do eiusmod tempor incididunt ut labore et ' +
    //     'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    //   route: '',
    // }, 
    //  { label: 'Cabana',
    //   imgSource: 'assets/images/sport.svg',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    //     'sed do eiusmod tempor incididunt ut labore et ' +
    //     'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    //   route: '',
    // }
    // ]
  },
  
  didRender (){
    this._super(...arguments);
    $('.screen').first().addClass('active');
    $('.dot').first().addClass('active');
  },
  
  indexMax() {
    return this.list.length - 1;
  },
  reset() {
    return $('.screen, .dot').removeClass('active');
  },
  goTo(index) {
    $('.screen').eq(index).addClass('active');
    return $('.dot').eq(index).addClass('active');
  },
  
  actions: {
    nextScreen() {
      //$('.next-screen').removeClass('active');
      if (this.index < this.indexMax()) {
        this.index++;
      } else {
        this.index=0;
      }
      this.actions.updateScreen.bind(this)();
      
      return
    },
    prevScreen() {
      //$('.prev-screen').removeClass('active')
      if (this.index > 0) {
        this.index--;
      } else {
        this.index=this.indexMax();
      }
      this.actions.updateScreen.bind(this)();
     
      return
    },
    
    updateScreen() {
      this.reset();
      this.goTo(this.index);
      return ;
    },
    
    transition() {
      let thisRouter = this.container.lookup('controller:application');
      let data = Ember.isNone(this.list[this.index].data) ? undefined: this.list[this.index].data;
      thisRouter.transitionToRoute(this.list[this.index].route).data={data:data};
    }
    // setBtns: function() {
    //   var $lastBtn, $nextBtn, $prevBtn;
    //   $nextBtn = $('.next-screen');
    //   $prevBtn = $('.prev-screen');
    //   $lastBtn = $('.finish');
    //   if (this.index === this.indexMax()) {
    //     $nextBtn.prop('disabled', true);
    //     $prevBtn.prop('disabled', false);
    //     return $lastBtn.addClass('active').prop('disabled', false);
    //   } else if (walkthrough.index === 0) {
    //     $nextBtn.prop('disabled', false);
    //     $prevBtn.prop('disabled', true);
    //     return $lastBtn.removeClass('active').prop('disabled', true);
    //   } else {
    //     $nextBtn.prop('disabled', false);
    //     $prevBtn.prop('disabled', false);
    //     return $lastBtn.removeClass('active').prop('disabled', true);
    //   }
    // }
  }
});