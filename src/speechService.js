export default class SpeechService {
    constructor($timeout, $q) {
        this.$inject = ["$timeout", "$q"];
        this.$timeout = $timeout;
        this.$q = $q;
    }

    say(text, rate = 1.0) {
        const sayInternal = (text, rate) => {
            var utter = new SpeechSynthesisUtterance(text);
            utter.lang = "ru-RU";
            utter.rate = rate;
            var p = this.$q((resolve, reject) => {
                utter.onend = () => {
                    resolve();
                };
                speechSynthesis.speak(utter);
            });
            return p;
        }

        if (speechSynthesis.getVoices().length) {
            return sayInternal(text, rate);
        } else {
            return this.$timeout(200).then(() => {
                return sayInternal(text, rate);
            })
        }
    }
}
