export default class SpeechService {
    constructor($timeout, $q, translation) {
        this.$inject = ["$timeout", "$q", "translation"];
        this.$timeout = $timeout;
        this.$q = $q;
        this.lang = "ru-RU";
        this.translation = translation;
    }

    setLang(lang) {
        this.lang = lang;
    }

    sayWrong() {
        return this.say(this.translate("Wrong!"));
    }

    sayShowLetter(letter) {
        return this.say(this.translate("Show the letter")).then(() => {
            return this.say(`[${letter}]`, {rate: 0.6});
        });
    }

    sayCongrats() {
        return this.say(this.translate("You are right, well done!"));
    }

    translate(text) {
        return this.translation.translate(text, this.lang);
    }

    say(text, {
        rate = 1.0
    } = {}) {
        const sayInternal = (text, rate) => this.$q((resolve, reject) => {
            var utter = new SpeechSynthesisUtterance(text);
            utter.lang = this.lang;
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
