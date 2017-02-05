export default class SpeechService {
    constructor($timeout, $q) {
        this.$inject = ["$timeout", "$q"];
        this.$timeout = $timeout;
        this.$q = $q;
    }

    say(text, {
        rate = 1.0,
        lang
    } = {}) {
        const sayInternal = (text, rate) => this.$q((resolve, reject) => {
            var utter = new SpeechSynthesisUtterance(text);
            utter.lang = lang;
            utter.rate = rate;
            utter.onend = () => {
                resolve();
            };
            //some time utter is not ending
            this.$timeout(2000).then(() => resolve());
            speechSynthesis.speak(utter);
        });

        if (speechSynthesis.getVoices().length) {
            return sayInternal(text, rate);
        } else {
            return this.$timeout(200).then(() => this.say(text, rate))
        }
    }
}
