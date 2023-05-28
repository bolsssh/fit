import Ember from 'ember';
import HintMixin from '../mixins/hint';
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils
// } from "@mediapipe/tasks-vision";

//import {PoseNet as posenet, load} from "@tensorflow-models/posenet";
import * as posenet  from "@tensorflow-models/posenet";
import { PoseNet as net }  from "@tensorflow-models/posenet";
import {PoseNet} from "@tensorflow-models/posenet/dist/posenet_model";

export default Ember.Controller.extend(HintMixin, {
  store: Ember.inject.service(),
  video: undefined,
  canvas: undefined,
  videoPause: undefined,
  
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
  // //play: undefined,
  // //pause: undefined,
  // streamStarted: undefined,
  // startStream: undefined,
  // constraints: {
  //   video: {
  //     width: {
  //       min: 1280,
  //       ideal: 1920,
  //       max: 2560,
  //     },
  //     height: {
  //       min: 720,
  //       ideal: 1080,
  //       max: 1440
  //     },
  //   }
  // },
  // cameraOptions: undefined,
  // videoPause: undefined,
  // stream: undefined,
  // result: undefined,
  // timer: {
  //   startTime: performance.now(),
  //   endTime: undefined,
  //   duration: undefined,
  //   pauseTime: undefined,
  //   pauseStart: undefined,
  //  
  //   start() {
  //     this.startTime = performance.now();
  //   },
  //  
  //   pause() {
  //     this.pauseStart = performance.now();
  //   },
  //  
  //   continue() {
  //     this.pauseTime += performance.now() - this.pauseStart;
  //     this.pauseStart = 0;
  //   },
  //  
  //   end() {
  //     this.endTime = performance.now();
  //     this.duration = this.endTime - this.startTime;
  //     return this.duration / 1000;
  //   },
  //  
  //   msToTime() {
  //     let ms = this.duration,
  //       s = ms / 1000,
  //       secs = s % 60;
  //     s = (s - secs) / 60;
  //     let mins = s % 60;
  //    
  //     return mins + ':' + secs;
  //   }
  // },
  
  actions: {
    didRender() {
      let self = this;
      this.videoPause = false;
      this.video = document.getElementById('video');
      this.canvas = document.getElementById('canvas');
      
      const runPoseNet = () => {
        let ctx = self.canvas.getContext('2d');
        
        // Загрузка модели PoseNet
        posenet.load().then(function(net) {
          // Запуск обработки позы на каждом кадре видео
          detectPose(net);
        });
      }
      
      const detectPose = (net) => {
        // Получение размеров видео
        let videoWidth = self.video.videoWidth,
          videoHeight = self.video.videoHeight;
        
        // Установка размеров элемента canvas в соответствии с размерами видео
        self.canvas.width = videoWidth;
        self.canvas.height = videoHeight;
        
        // Обработка позы на каждом кадре видео
        function poseDetectionFrame() {
          net.estimateSinglePose(self.video).then(function(pose) {
            drawPose(pose, videoWidth, videoHeight);
            requestAnimationFrame(poseDetectionFrame);
          });
        }
        
        poseDetectionFrame();
      }
      
      const drawPose = (pose, videoWidth, videoHeight) => {
        let ctx = self.canvas.getContext('2d');
        
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.drawImage(self.video, 0, 0, videoWidth, videoHeight);
        
        // Отрисовка каждой ключевой точки позы
        for (let i = 0; i < pose.keypoints.length; i++) {
          let keypoint = pose.keypoints[i];
          if (keypoint.score > 0.5) {
            ctx.beginPath();
            ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.stroke();
          }
        }
        // Отрисовка линий между точками позы
        let adjacentKeyPoints = posenet.getAdjacentKeyPoints(pose.keypoints, 0.5);
        
        for (let i = 0; i < adjacentKeyPoints.length; i++) {
          let points = adjacentKeyPoints[i],
            startPoint = points[0].position,
            endPoint = points[1].position;
          
          ctx.beginPath();
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(endPoint.x, endPoint.y);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
        }
      }
      
      let con = { video: true };
      
      const startStream = async (constraints) => {
        self.stream = await navigator.mediaDevices.getUserMedia(constraints);
        self.video.srcObject = self.stream;
        self.video.onloadedmetadata = function() {
          self.video.play();
          runPoseNet(); // Запуск обработки позы после загрузки видео
        }
      };
      
      startStream(con).then(()=>{
        //document.querySelector('.loader').classList.add('d-none');
        document.querySelector('.display-cover').classList.remove('d-none');
        this.timer.start();
      });
    },
    
    disableHints(){
      if(this.hintEnabled){
        this.stopCycle();
      }
      else{
        this.startCycle();
      }
    },
    
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
    initCanvas(){
      console.log('canva')
    },
  },
})

// disableHints(){
//   if(this.hintEnabled){
//     this.stopCycle();
//   }
//   else{
//     this.startCycle();
//   }
// },
// // pauseStream() {
// //   this.video.pause();
// //   this.play.classList.remove('d-none');
// //   this.pause.classList.add('d-none');
// // },
//
// playStream() {
//   if (this.videoPause) {
//     this.videoPause = false;
//     this.video.play();
//     this.timer.continue();
//     this.startCycle();
//    
//    
//     //this.play.classList.add('d-none');
//     //this.pause.classList.remove('d-none');
//   } else {
//     this.videoPause = true;
//     this.video.pause();
//     this.timer.pause();
//     this.stopCycle();
//     // this.play.classList.remove('d-none');
//     // this.pause.classList.add('d-none');
//   }
// },
//
// stop() {
//   this.stream.getTracks().forEach(function(track) {
//     track.stop();
//   });
//   this.stopCycle();
//   let appController = this.container.lookup('controller:application'),
//     result = this.store.createRecord('result', {
//       duration: this.timer.end(),
//       score: Math.random() * 100 | 0,
//       login: appController.currentUser,
//     })
//   result.save().catch((error) => {
//     this.set('errorMessage', error)
//    
//   }).then(() => {
//     this.set('result', result);
//     appController.transitionToRoute('result');
//   })
// },
