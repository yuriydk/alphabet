(()=>{
  "use strict"

angular.module("main")
.service("speech",["$timeout", function ($timeout) {
  var sayInternal = (text, rate) => {
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ru-RU";
    utter.rate = rate;
    var p = new Promise((resolve, reject)=>{
      utter.onend = () => {
        resolve();
      };
      speechSynthesis.speak(utter);
    });
    return p;
  }
  this.say = (text, rate = 1.0) => {
    if(speechSynthesis.getVoices().length){
        return sayInternal(text, rate);
    }else{
      return $timeout(200)
      .then(() => {
        return sayInternal(text, rate);
      })
    }
  }
}])
})();
