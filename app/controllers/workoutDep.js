import Ember from 'ember';
import HintMixin from '../mixins/hint';

export default Ember.Controller.extend(HintMixin, {
  store: Ember.inject.service(),
  video: undefined,
  //play: undefined,
  //pause: undefined,
  streamStarted: undefined,
  startStream: undefined,
  constraints: {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440
      },
    }
  },
  cameraOptions: undefined,
  videoPause: undefined,
  stream: undefined,
  result: undefined,
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
  
  actions: {
    didRender() {
      this.cameraOptions = document.querySelector('.video-options>select');
      this.video = document.querySelector('video');
      const buttons = document.querySelectorAll('button');
      this.streamStarted = false;
      this.videoPause = false;
      //this.play = buttons[0];
      //this.pause = buttons[1];
      this.cameraOptions.onchange = () => {
        this.constraints.deviceId = {
          exact: this.cameraOptions.value
        }
        const updatedConstraints = this.constraints;
        startStream(updatedConstraints);
      };
      
      const startStream = async (constraints) => {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
        document.querySelector('.loader').classList.add('d-none')
        document.querySelector('.display-cover').classList.remove('d-none')
        handleStream(this.stream);
      };
      
      const handleStream = (stream) => {
        this.video.srcObject = stream;
        // this.play.classList.add('d-none');
        // this.pause.classList.remove('d-none');
        
      };
      
      this.startStream = startStream;
      
      const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const options = videoDevices.map(videoDevice => {
          return `<option value="${ videoDevice.deviceId }">${ videoDevice.label }</option>`;
        });
        this.cameraOptions.innerHTML = options.join('');
      };
      
      getCameraSelection();
      
      if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        this.constraints.deviceId = {
          exact: this.cameraOptions.value
        }
        this.streamStarted = true;
        const updatedConstraints = this.constraints;
        this.startStream(updatedConstraints);
        this.video.play();
        this.timer.start();
      }
    },
    disableHints(){
      if(this.hintEnabled){
        this.stopCycle();
      }
      else{
        this.startCycle();
      }
    },
    // pauseStream() {
    //   this.video.pause();
    //   this.play.classList.remove('d-none');
    //   this.pause.classList.add('d-none');
    // },
    
    playStream() {
      if (this.videoPause) {
        this.videoPause = false;
        this.video.play();
        this.timer.continue();
        this.startCycle();
        
        
        //this.play.classList.add('d-none');
        //this.pause.classList.remove('d-none');
      } else {
        this.videoPause = true;
        this.video.pause();
        this.timer.pause();
        this.stopCycle();
        // this.play.classList.remove('d-none');
        // this.pause.classList.add('d-none');
      }
    },
    
    stop() {
      this.stream.getTracks().forEach(function(track) {
        track.stop();
      });
      this.stopCycle();
      let appController = this.container.lookup('controller:application'),
        result = this.store.createRecord('result', {
          duration: this.timer.end(),
          score: Math.random() * 100 | 0,
          login: appController.currentUser,
        })
      result.save().catch((error) => {
        this.set('errorMessage', error)
        
      }).then(() => {
        this.set('result', result);
        appController.transitionToRoute('result');
      })
    },
  }
})
