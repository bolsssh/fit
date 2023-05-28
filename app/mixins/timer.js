import Ember from 'ember';

export default Ember.Mixin.create({
  timer: {
    startTime: performance.now(),
    endTime: undefined,
    duration: undefined,
    pauseTime: undefined,
    pauseStart: undefined,
    
    start() {
      this.startTime = performance.now();
    },
    
    pause() {
      this.pauseStart = performance.now();
    },
    
    continue() {
      this.pauseTime += performance.now() - this.pauseStart;
      this.pauseStart = 0;
    },
    
    end() {
      this.endTime = performance.now();
      this.duration = this.endTime - this.startTime;
      return this.duration / 1000;
    },
    
    msToTime() {
      let ms = this.duration,
        s = ms / 1000,
        secs = s % 60;
      s = (s - secs) / 60;
      let mins = s % 60;
      
      return mins + ':' + secs;
    }
  },
});


