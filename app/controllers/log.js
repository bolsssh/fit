// import Ember from 'ember';
//
// export default Ember.Controller.extend({
//   store: Ember.inject.service(),
//   video: undefined,
//   play: undefined,
//   pause: undefined,
//   streamStarted: undefined,
//   startStream: undefined,
//   constraints: undefined,
//   cameraOptions: undefined,
//   videoPause: undefined,
//   stream: undefined,
//   result: undefined,
//   timer: {
//     startTime: performance.now(),
//     endTime: undefined,
//     duration: undefined,
//     pauseTime: undefined,
//     pauseStart: undefined,
//    
//     start() {
//       this.startTime = performance.now();
//     },
//    
//     pause() {
//       this.pauseStart = performance.now();
//     },
//    
//     continue() {
//       this.pauseTime += performance.now() - this.pauseStart;
//       this.pauseStart = 0;
//     },
//    
//     end() {
//       this.endTime = performance.now();
//       this.duration = this.endTime - this.startTime;
//       return this.duration / 1000;
//     },
//    
//     msToTime() {
//       let ms = this.duration,
//         s = ms / 1000,
//         secs = s % 60;
//       s = (s - secs) / 60;
//       let mins = s % 60;
//      
//       return mins + ':' + secs;
//     }
//   },
//  
//   init() {
//     //feather.replace();
//     Ember.run.schedule("afterRender", this, function() {
//       this.send("didRender");
//     });
//   },
//  
//   actions: {
//     didRender() {
//       //const controls = document.querySelector('.controls');
//       this.cameraOptions = document.querySelector('.video-options>select');
//       this.video = document.querySelector('video');
//       //const canvas = document.querySelector('canvas');
//       //const screenshotImage = document.querySelector('img');
//       const buttons = document.querySelectorAll('button');
//       this.streamStarted = false;
//       this.videoPause = true;
//       this.play = buttons[0];
//       this.pause = buttons[1];
//       this.constraints = {
//         video: {
//           width: {
//             min: 1280,
//             ideal: 1920,
//             max: 2560,
//           },
//           height: {
//             min: 720,
//             ideal: 1080,
//             max: 1440
//           },
//         }
//       };
//      
//       this.cameraOptions.onchange = () => {
//         this.constraints.deviceId = {
//           exact: this.cameraOptions.value
//         }
//         const updatedConstraints = this.constraints;
//         startStream(updatedConstraints);
//       };
//      
//       const startStream = async (constraints) => {
//         this.stream = await navigator.mediaDevices.getUserMedia(constraints);
//         handleStream(this.stream);
//       };
//      
//       const handleStream = (stream) => {
//         this.video.srcObject = stream;
//         this.play.classList.add('d-none');
//         this.pause.classList.remove('d-none');
//         //screenshot.classList.remove('d-none');
//        
//       };
//      
//       this.startStream = startStream;
//       // const doScreenshot = () => {
//       //   canvas.width = this.video.videoWidth;
//       //   canvas.height = this.video.videoHeight;
//       //   canvas.getContext('2d').drawImage(video, 0, 0);
//       //   screenshotImage.src = canvas.toDataURL('image/webp');
//       //   screenshotImage.classList.remove('d-none');
//       // };
//      
//       // screenshot.onclick = doScreenshot;
//      
//       const getCameraSelection = async () => {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(device => device.kind === 'videoinput');
//         const options = videoDevices.map(videoDevice => {
//           return `<option value="${ videoDevice.deviceId }">${ videoDevice.label }</option>`;
//         });
//         this.cameraOptions.innerHTML = options.join('');
//       };
//      
//       getCameraSelection();
//     },
//    
//     // pauseStream() {
//     //   this.video.pause();
//     //   this.play.classList.remove('d-none');
//     //   this.pause.classList.add('d-none');
//     // },
//    
//     playStream() {
//       if (this.videoPause) {
//         this.videoPause = false;
//         if (this.streamStarted) {
//           this.video.play();
//           this.timer.continue();
//           //this.play.classList.add('d-none');
//           //this.pause.classList.remove('d-none');
//         } else {
//           if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
//             this.constraints.deviceId = {
//               exact: this.cameraOptions.value
//             }
//             this.streamStarted = true;
//             const updatedConstraints = this.constraints;
//             this.startStream(updatedConstraints);
//             this.video.play();
//             this.timer.start();
//           }
//         }
//       } else {
//         this.videoPause = true;
//         this.video.pause();
//         this.timer.pause();
//         // this.play.classList.remove('d-none');
//         // this.pause.classList.add('d-none');
//       }
//     },
//    
//     Stop() {
//       this.stream.getTracks().forEach(function(track) {
//         track.stop();
//       });
//       let appController = this.container.lookup('controller:application'),
//         result = this.store.createRecord('result', {
//           duration: this.timer.end(),
//           score: Math.random() * 100 | 0,
//           login: appController.currentUser,
//         })
//       result.save().catch((error) => {
//         this.set('errorMessage', error)
//        
//       }).then(()=>{
//         this.set('result', result);
//         appController.transitionToRoute('result');
//       })
//     },
//   }
// })

//-------------------------
// import Ember from 'ember';
//
// export default Ember.Controller.extend({
//   store: Ember.inject.service(),
//   video: undefined,
//   play: undefined,
//   pause: undefined,
//   streamStarted: undefined,
//   startStream: undefined,
//   constraints: undefined,
//   cameraOptions: undefined,
//   videoPause: undefined,
//   stream: undefined,
//   result: undefined,
//   timer: {
//     startTime: performance.now(),
//     endTime: undefined,
//     duration: undefined,
//     pauseTime: undefined,
//     pauseStart: undefined,
//    
//     start() {
//       this.startTime = performance.now();
//     },
//    
//     pause() {
//       this.pauseStart = performance.now();
//     },
//    
//     continue() {
//       this.pauseTime += performance.now() - this.pauseStart;
//       this.pauseStart = 0;
//     },
//    
//     end() {
//       this.endTime = performance.now();
//       this.duration = this.endTime - this.startTime;
//       return this.duration / 1000;
//     },
//    
//     msToTime() {
//       let ms = this.duration,
//         s = ms / 1000,
//         secs = s % 60;
//       s = (s - secs) / 60;
//       let mins = s % 60;
//      
//       return mins + ':' + secs;
//     }
//   },
//  
//   init() {
//     Ember.run.schedule("afterRender", this, function() {
//       this.send("didRender");
//     });
//   },
//  
//   actions: {
//     didRender() {
//       this.cameraOptions = document.querySelector('.video-options>select');
//       this.video = document.querySelector('video');
//       const buttons = document.querySelectorAll('button');
//       this.streamStarted = false;
//       this.videoPause = false;
//       this.play = buttons[0];
//       this.pause = buttons[1];
//       this.constraints = {
//         video: {
//           width: {
//             min: 1280,
//             ideal: 1920,
//             max: 2560,
//           },
//           height: {
//             min: 720,
//             ideal: 1080,
//             max: 1440
//           },
//         }
//       };
//      
//       this.cameraOptions.onchange = () => {
//         this.constraints.deviceId = {
//           exact: this.cameraOptions.value
//         }
//         const updatedConstraints = this.constraints;
//         startStream(updatedConstraints);
//       };
//      
//       const startStream = async (constraints) => {
//         this.stream = await navigator.mediaDevices.getUserMedia(constraints);
//         this.set('loaded', true);
//         handleStream(this.stream);
//       };
//      
//       const handleStream = (stream) => {
//         this.video.srcObject = stream;
//         this.play.classList.add('d-none');
//         this.pause.classList.remove('d-none');
//        
//       };
//      
//       this.startStream = startStream;
//      
//       const getCameraSelection = async () => {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(device => device.kind === 'videoinput');
//         const options = videoDevices.map(videoDevice => {
//           return `<option value="${ videoDevice.deviceId }">${ videoDevice.label }</option>`;
//         });
//         this.cameraOptions.innerHTML = options.join('');
//       };
//      
//       getCameraSelection();
//      
//       if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
//         this.constraints.deviceId = {
//           exact: this.cameraOptions.value
//         }
//         this.streamStarted = true;
//         const updatedConstraints = this.constraints;
//         this.startStream(updatedConstraints);
//         this.video.play();
//         this.timer.start();
//       }
//     },
//    
//     // pauseStream() {
//     //   this.video.pause();
//     //   this.play.classList.remove('d-none');
//     //   this.pause.classList.add('d-none');
//     // },
//    
//     playStream() {
//       if (this.videoPause) {
//         this.videoPause = false;
//         this.video.play();
//         this.timer.continue();
//         //this.play.classList.add('d-none');
//         //this.pause.classList.remove('d-none');
//       } else {
//         this.videoPause = true;
//         this.video.pause();
//         this.timer.pause();
//         // this.play.classList.remove('d-none');
//         // this.pause.classList.add('d-none');
//       }
//     },
//    
//     Stop() {
//       this.stream.getTracks().forEach(function(track) {
//         track.stop();
//       });
//       let appController = this.container.lookup('controller:application'),
//         result = this.store.createRecord('result', {
//           duration: this.timer.end(),
//           score: Math.random() * 100 | 0,
//           login: appController.currentUser,
//         })
//       result.save().catch((error) => {
//         this.set('errorMessage', error)
//        
//       }).then(() => {
//         this.set('result', result);
//         appController.transitionToRoute('result');
//       })
//     },
//   }
// })
