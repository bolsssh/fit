import Ember from 'ember';

export default Ember.Mixin.create({
  currentRepetitions: 0,
  totalCaloriesBurned: 0,
  pose: undefined,
  angle: 0,
  isFlexing: false,
  
  //todo
  // exerciseList: [
  //   { name: 'Squats', repetitions: 5 },
  // ],
  
  Calories: {
    'Squats': 0.66,            // Количество калорий, сжигаемых за одно приседание
    'Push-ups': 2,          // Количество калорий, сжигаемых за одно отжимание
    'Bicep Curls': 3,       // Количество калорий, сжигаемых за одно сгибание бицепса
    'Forward Bends': 4,     // Количество калорий, сжигаемых за один наклон туловища вперед
  },
  currentExerciseIndex: 0,
  
  // calculateAngle(p1, p2, p3) {
  //   const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
  //   const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
  //  
  //   const dotProduct = v1.x * v2.x + v1.y * v2.y;
  //   const magnitudeV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  //   const magnitudeV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  //  
  //   const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);
  //   const theta = Math.acos(cosTheta);
  //   const angle = (theta * 180) / Math.PI;
  //  
  //   return angle;
  // },
  
  // Функция для вычисления угла между тремя точками
  calculateAngle(pointA, pointB, pointC) {
    const vectorA = [ pointA.x - pointB.x, pointA.y - pointB.y ],
      vectorB = [ pointC.x - pointB.x, pointC.y - pointB.y ],
      dotProduct = vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1],
      magnitudeA = Math.sqrt(vectorA[0] * vectorA[0] + vectorA[1] * vectorA[1]),
      magnitudeB = Math.sqrt(vectorB[0] * vectorB[0] + vectorB[1] * vectorB[1]),
      cosine = dotProduct / (magnitudeA * magnitudeB);
    
    return Math.acos(cosine) * (180 / Math.PI);
  },
  
  detectExercise(pose) {
    this.pose = pose;
    if (this.currentExerciseIndex >= this.exerciseList.length) {
      return;
    }
    
    const exerciseItem = this.exerciseList[this.currentExerciseIndex],
      exerciseName = exerciseItem['name'],
      repetitions = exerciseItem['repetitions'];
    
    switch (exerciseName) {
      case 'Squats':
        this.detectSquats(repetitions);
        break;
      // case 'Push-ups':
      //   this.detectPushups(repetitions);
      //   break;
      case 'Bicep Curls':
        this.detectBicepCurls.bind(this)(repetitions);
        break;
      // case 'Forward Bends':
      //   this.detectForwardBends(repetitions);
      //   break;
    }
  },
  printSuccess(){
    let element = document.querySelector('.success-message');
  
    element.style.transition = 'none';
    element.style.opacity = '1';
    /* This line seems to 'reset' the element so that the transition can be run again. */
    void element.offsetWidth;
    element.style.transition = 'opacity 2s';
    element.style.opacity = '0';
  },
  // // Функция для отслеживания приседаний
  detectSquats(repetitions) {
    // Получение позы текущего кадра
    
    // Получение ключевых точек необходимых для отслеживания приседаний
    const leftHip = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftHip'),
      leftKnee = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftKnee'),
      leftAnkle = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftAnkle'),
      rightHip = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightHip'),
      rightKnee = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightKnee'),
      rightAnkle = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightAnkle');
    
    if (leftHip.score < 0.5 || leftKnee.score < 0.5 || leftAnkle.score < 0.5
      || rightHip.score < 0.5 || rightKnee.score < 0.5 || rightAnkle.score < 0.5) {
      return;
    }
    
    // Расчет углов для левой и правой ноги
    const leftAngle = this.calculateAngle(leftHip.position, leftKnee.position, leftAnkle.position),
      rightAngle = this.calculateAngle(rightHip.position, rightKnee.position, rightAnkle.position);
    
    // Проверка условий приседания
    const squatAngleThreshold = 90, // Пороговое значение угла для приседания
      initialAngleThreshold = 160; // Пороговое значение угла для начальной позиции
    
    
    if (leftAngle > initialAngleThreshold && rightAngle > initialAngleThreshold && !this.isFlexing) {
      this.isFlexing = true;
    } else if ((leftAngle < squatAngleThreshold || rightAngle < squatAngleThreshold) && this.isFlexing) {
      this.currentRepetitions++;
      this.printSuccess();
      console.log('success')
      this.totalCaloriesBurned += this.Calories.Squats;
      this.isFlexing = false;
    }
    
    this.updateExerciseCounter();
    
    if (this.currentRepetitions === repetitions) {
      this.currentExerciseIndex++;
      this.currentRepetitions = 0;
    }
    
    if (this.currentExerciseIndex >= this.exerciseList.length) {
      this.showStatistics();
    } 
  },
  
  
  // Функция для отслеживания отжиманий
  // detectPushups(repetitions) {
  //   // Получение позы текущего кадра
  //  
  //   // Получение ключевых точек необходимых для отслеживания отжиманий
  //   const leftShoulder = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftShoulder');
  //   const rightShoulder = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightShoulder');
  //   const leftElbow = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftElbow');
  //   const rightElbow = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightElbow');
  //   const leftWrist = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftWrist');
  //   const rightWrist = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightWrist');
  //   const nose = this.pose.keypoints.find((keypoint) => keypoint.part === 'nose');
  //  
  //   if (!leftShoulder || !rightShoulder || !leftElbow || !rightElbow || !leftWrist || !rightWrist || !nose) {
  //     return;
  //   }
  //  
  //   // Проверка условий отжиманий
  //  
  //   // Условие: Тело должно быть прямым, создавая прямую линию от головы до пяток
  //   const isBodyStraight = this.isStraightBody(this.pose);
  //  
  //   // Условие: Глубина опускания тела. Грудь должна опускаться до уровня пола, но не ниже
  //   const isChestDepthCorrect = this.isCorrectChestDepth(this.pose);
  //  
  //   // Условие: Угол сгибания локтей. Локти должны быть слегка согнуты, образуя угол примерно в 90 градусов в нижнем положении
  //   // и угол выше 160 градусов в верхнем положении
  //   const isElbowAngleCorrect = this.isCorrectElbowAngle(this.pose);
  //  
  //   // Условие: Положение ног. Носки ног должны быть опирающимися на пол, а не на носки
  //   const isFeetPositionCorrect = this.isCorrectFeetPosition(this.pose);
  //  
  //   // При успешном выполнении отжиманий
  //   if (isBodyStraight && isChestDepthCorrect && isElbowAngleCorrect && isFeetPositionCorrect) {
  //     this.currentRepetitions++;
  //     this.totalCaloriesBurned += this.Calories['Pushups'];
  //   }
  //  
  //   this.updateExerciseCounter();
  //  
  //   if (this.currentRepetitions === repetitions) {
  //     currentExerciseIndex++;
  //     this.currentRepetitions = 0;
  //   }
  //  
  //   // if (this.currentExerciseIndex < this.exerciseList.length) {
  //   //   this.detectExercise(this.pose);
  //   // } else {
  //   //   this.showStatistics();
  //   // }
  // },
  
  // Функция для проверки условия: Тело должно быть прямым, создавая прямую линию от головы до пяток
  isStraightBody(pose) {
    const leftHip = pose.keypoints.find((keypoint) => keypoint.part === 'leftHip'),
      rightHip = pose.keypoints.find((keypoint) => keypoint.part === 'rightHip'),
      leftAnkle = pose.keypoints.find((keypoint) => keypoint.part === 'leftAnkle'),
      rightAnkle = pose.keypoints.find((keypoint) => keypoint.part === 'rightAnkle'),
      nose = pose.keypoints.find((keypoint) => keypoint.part === 'nose');
    
    if (!leftHip || !rightHip || !leftAnkle || !rightAnkle || !nose) {
      return false;
    }
    
    // Проверяем, что угол между головой и пятками больше 160 градусов
    const hipAnkleAngle = this.calculateAngle(leftHip.position, rightHip.position, nose.position),
      ankleAngle = this.calculateAngle(leftAnkle.position, rightAnkle.position, nose.position);
    
    return hipAnkleAngle >= 160 && ankleAngle >= 160;
  },

// Функция для проверки условия: Глубина опускания тела
  isCorrectChestDepth(pose) {
    const leftShoulder = pose.keypoints.find((keypoint) => keypoint.part === 'leftShoulder'),
      rightShoulder = pose.keypoints.find((keypoint) => keypoint.part === 'rightShoulder'),
      nose = pose.keypoints.find((keypoint) => keypoint.part === 'nose');
    
    if (!leftShoulder || !rightShoulder || !nose) {
      return false;
    }
    
    // Проверяем, что грудь опускается до уровня пола, но не ниже
    const shoulderNoseDistance = this.calculateDistance(leftShoulder.position, rightShoulder.position),
      chestNoseDistance = this.calculateDistance(leftShoulder.position, nose.position);
    
    return chestNoseDistance <= shoulderNoseDistance && chestNoseDistance > 0.5 * shoulderNoseDistance;
  },
  
  // Функция для проверки условия: Угол сгибания локтей
  isCorrectElbowAngle(pose) {
    const leftShoulder = pose.keypoints.find((keypoint) => keypoint.part === 'leftShoulder'),
      rightShoulder = pose.keypoints.find((keypoint) => keypoint.part === 'rightShoulder'),
      leftElbow = pose.keypoints.find((keypoint) => keypoint.part === 'leftElbow'),
      rightElbow = pose.keypoints.find((keypoint) => keypoint.part === 'rightElbow');
    
    if (!leftShoulder || !rightShoulder || !leftElbow || !rightElbow) {
      return false;
    }
    
    // Проверяем, что угол между локтем и плечом находится в нужном диапазоне
    const leftElbowAngle = this.calculateAngle(leftShoulder.position, leftElbow.position),
      rightElbowAngle = this.calculateAngle(rightShoulder.position, rightElbow.position);
    
    return leftElbowAngle >= 90 && leftElbowAngle <= 160 && rightElbowAngle >= 90 && rightElbowAngle <= 160;
  },
  
  // Функция для проверки условия: Положение ног
  isCorrectFeetPosition(pose) {
    const leftAnkle = pose.keypoints.find((keypoint) => keypoint.part === 'leftAnkle'),
      rightAnkle = pose.keypoints.find((keypoint) => keypoint.part === 'rightAnkle'),
      leftToe = pose.keypoints.find((keypoint) => keypoint.part === 'leftToe'),
      rightToe = pose.keypoints.find((keypoint) => keypoint.part === 'rightToe');
    
    if (!leftAnkle || !rightAnkle || !leftToe || !rightToe) {
      return false;
    }
    
    // Проверяем, что носки ног опираются на пол, а не на носки
    const leftToeAnkleDistance = this.calculateDistance(leftToe.position, leftAnkle.position),
      rightToeAnkleDistance = this.calculateDistance(rightToe.position, rightAnkle.position);
    
    return leftToeAnkleDistance <= 0.2 && rightToeAnkleDistance <= 0.2;
  },
  
  // Функция для вычисления расстояния между двумя точками
  calculateDistance(pointA, pointB) {
    const deltaX = pointA.x - pointB.x;
    const deltaY = pointA.y - pointB.y;
    
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },
  
  // Функция для отслеживания сгибания бицепса
  detectBicepCurls(repetitions) {
    // Получение позы текущего кадра
    
    // Получение ключевых точек необходимых для отслеживания сгибания бицепса
    const leftShoulder = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftShoulder'),
      leftElbow = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftElbow'),
      leftWrist = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftWrist'),
      rightShoulder = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightShoulder'),
      rightElbow = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightElbow'),
      rightWrist = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightWrist');
    
    if (leftShoulder.score < 0.5 || leftElbow.score < 0.5 || rightShoulder.score < 0.5
      || rightElbow.score < 0.5 || leftWrist.score < 0.5 || rightWrist.score < 0.5) {
      return;
    }
    
    const leftAngle = this.calculateAngle(leftShoulder.position, leftElbow.position, leftWrist.position),
      rightAngle = this.calculateAngle(rightShoulder.position, rightElbow.position, rightWrist.position),
      extendedThreshold = 160, // Пороговое значение угла для разогнутой руки
      curledThreshold = 40, // Пороговое значение угла для сгибания бицепса
      isLeftExtended = leftAngle >= extendedThreshold,
      isRightExtended = rightAngle >= extendedThreshold,
      isLeftCurled = leftAngle <= curledThreshold,
      isRightCurled = rightAngle <= curledThreshold;
    
    // При успешном выполнении сгибания бицепса
    
    if ((isLeftExtended) && !this.isFlexing) {
      this.isFlexing = true;
    } else if ((isLeftCurled) && this.isFlexing) {
      this.currentRepetitions++
      this.totalCaloriesBurned += this.Calories['Bicep Curls'];
      this.isFlexing = false;
    }
    
    this.updateExerciseCounter();
    
    if (this.currentRepetitions === repetitions) {
      this.currentExerciseIndex++;
      this.currentRepetitions = 0;
    }
    
    if (this.currentExerciseIndex >= this.exerciseList.length) {
      this.showStatistics.bind(this)();
    }
  },
  
  
  // Функция для отслеживания наклонов туловища вперед
  // detectForwardBends(repetitions) {
  //  
  //   // Получение ключевых точек необходимых для отслеживания наклонов туловища
  //   const leftHip = this.pose.keypoints.find((keypoint) => keypoint.part === 'leftHip');
  //   const rightHip = this.pose.keypoints.find((keypoint) => keypoint.part === 'rightHip');
  //   const nose = this.pose.keypoints.find((keypoint) => keypoint.part === 'nose');
  //  
  //   if (!leftHip || !rightHip || !nose) {
  //     return;
  //   }
  //  
  //   // Расчет угла между бедрами и головой
  //   const hipHeadAngle = this.calculateAngle(leftHip.position, rightHip.position, nose.position);
  //  
  //   // Проверка условий наклона туловища вперед
  //   const standingThreshold = 160; // Пороговое значение угла для начального положения
  //   const bendingThreshold = 90; // Пороговое значение угла для наклона туловища
  //  
  //   const isStandingStraight = hipHeadAngle >= standingThreshold;
  //   const isBendingForward = hipHeadAngle < bendingThreshold;
  //  
  //   // При успешном выполнении наклонов туловища вперед
  //   if (isStandingStraight && isBendingForward) {
  //     this.currentRepetitions++;
  //     this.totalCaloriesBurned += this.Calories['Forward Bends'];
  //   }
  //  
  //   this.updateExerciseCounter();
  //  
  //   if (this.currentRepetitions === repetitions) {
  //     this.currentExerciseIndex++;
  //     this.currentRepetitions = 0;
  //   }
  //  
  //   // if (this.currentExerciseIndex < this.exerciseList.length) {
  //   //   this.detectExercise(this.pose);
  //   // } else {
  //   //   this.showStatistics();
  //   // }
  // },
  
  // Обновление счетчиков выполненных упражнений
  updateExerciseCounter() {
    switch (this.currentExerciseIndex) {
      case 0:
        //squatsCounterElement.textContent = this.currentRepetitions;
        break;
      case 1:
        // pushupsCounterElement.textContent = this.currentRepetitions;
        break;
      case 2:
        // bicepCurlsCounterElement.textContent = this.currentRepetitions;
        break;
      case 3:
        //forwardBendsCounterElement.textContent = this.currentRepetitions;
        break;
    }
  },
  
  // Отображение статистики выполненных упражнений
  showStatistics() {
    console.log(this.totalCaloriesBurned.toFixed(2))
    
    for (const exerciseItem of this.exerciseList) {
      const exerciseName = exerciseItem['name'];
      const repetitions = exerciseItem['repetitions'];
      const caloriesBurned = this.Calories[exerciseName] * repetitions;
      console.log(`${ exerciseName }: ${ repetitions } repetitions (${ caloriesBurned } calories)`)
    }
    this.actions.stop.bind(this)();
  },
});


