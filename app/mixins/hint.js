import Ember from 'ember';

export default Ember.Mixin.create({
  lifecycle: undefined,
  //voice: undefined,
  hintEnabled: false,
  getHint(error) {
   return this.get('store').findRecord('hint', error)
  },
  
  // findVoice(lang) {
  //   let voices=window.speechSynthesis.getVoices();
  //   for (let i = 0; i < voices.length; i++) {
  //     if (voices[i].lang === lang) { return voices[i]; }
  //   }
  //   return null;
  // },
  // init() {
  //   var voices = window.speechSynthesis.getVoices();
  //   this.voice = this.findVoice("ru-RU")
  //   setTimeout(function() { voices = window.speechSynthesis.getVoices(); }, 1000);
  //
  //  
  //
  //   // this.speak = function(s) {
  //   //   if (!window.speechSynthesis) { return; }
  //   //   var utterance = new SpeechSynthesisUtterance(s);
  //   //   utterance.lang = "ru-RU";
  //   //   utterance.voice = findVoice(utterance.lang);
  //   //   window.speechSynthesis.speak(utterance);
  //   // };  
  // },

  startCycle() {
    this.hintEnabled=true;
    this.lifecycle = setInterval(() => {
      let error = Math.random() * 40 | 0;
      if(error<4){
        this.getHint(error).then(result=>{
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(result.get('hintText')))
        });
      }
      // const say = Say;
      // say.speak('Hello!')
    }, 2000);
  },
  
  stopCycle() {
    this.hintEnabled=false;
    clearInterval(this.lifecycle);
  },
});