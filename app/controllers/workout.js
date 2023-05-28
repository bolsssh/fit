import Ember from 'ember';
import HintMixin from '../mixins/hint';
import TimerMixin from '../mixins/timer';
import WorkoutAnalyserMixin from '../mixins/workoutAnalyser';
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils
// } from "@mediapipe/tasks-vision";

//import {PoseNet as posenet, load} from "@tensorflow-models/posenet";
import * as posenet from "@tensorflow-models/posenet";
// import {PoseNet as net} from "@tensorflow-models/posenet";
// import {PoseNet} from "@tensorflow-models/posenet/dist/posenet_model";

export default Ember.Controller.extend(HintMixin, TimerMixin, WorkoutAnalyserMixin, {
  store: Ember.inject.service(),
  video: undefined,
  canvas: undefined,
  videoPause: undefined,
  active: false,

  actions: {
    didRender() {
      let self = this;
      this.videoPause = false;
      this.video = document.querySelector('video');
      this.canvas = document.querySelector('canvas');
      // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      //   vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
      //   avw = vw * 0.9,
      //   avh = vh * 0.9;

      const runPoseNet = () => {
        //let ctx = self.canvas.getContext('2d');

        posenet.load().then(function(net) {
          detectPose(net);
          document.querySelector('.loader').classList.add('d-none');
          document.querySelector('.display-cover').classList.remove('d-none');
        });
      }

      const detectPose = (net) => {
        let videoWidth = self.video.videoWidth,
          videoHeight = self.video.videoHeight;

        self.canvas.width = videoWidth;
        self.canvas.height = videoHeight;

        function poseDetectionFrame() {
          net.estimateSinglePose(self.video).then(function(pose) {
            if (!self.videoPause) {
              drawPose(pose, videoWidth, videoHeight);
              self.detectExercise(pose);
              requestAnimationFrame(poseDetectionFrame);
            }
          });
        }

        poseDetectionFrame();
      }

      const drawPose = (pose, videoWidth, videoHeight) => {
        let ctx = self.canvas.getContext('2d');

        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.drawImage(self.video, 0, 0, videoWidth, videoHeight);

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

        let adjacentKeyPoints = posenet.getAdjacentKeyPoints(pose.keypoints, 0.8);

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

      let con = {
        video: {
          width: {
            min: 800,
            ideal: 800,
            max: 800,
          }
        }
      };

      const startStream = async (constraints) => {
        self.stream = await navigator.mediaDevices.getUserMedia(constraints);
        self.video.srcObject = self.stream;
        self.video.onloadedmetadata = function() {
          self.video.play();
          self.active = true;
          runPoseNet();
        }
      };

      startStream(con).then(() => {
        this.timer.start();
      });
    },

    disableHints(event) {
      if (this.hintEnabled) {
        this.stopCycle();
        event.srcElement.src="assets/images/soundoff.svg";
      } else {
        this.startCycle();
        event.srcElement.src="assets/images/soundon.svg";
      }
    },

    playStream(event) {
      if (this.videoPause) {
        this.videoPause = false;
        this.video.play();
        this.timer.continue();
        this.startCycle();
        event.srcElement.src="assets/images/play2.svg";
      } else {
        this.videoPause = true;
        this.video.pause();
        this.timer.pause();
        this.stopCycle();
        event.srcElement.src="assets/images/pause.svg";
      }
    },

    stop() {
      this.stream.getTracks().forEach(function(track) {
        track.stop();
      });
      this.stopCycle();
      this.active = false;
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
  },
})