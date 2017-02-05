export default class SpeakerService {
    constructor(speech, translation) {
        this.$inject = ["speech", "translation"];
        this.speech = speech;
        this.translation = translation;
        this.lang = "ru-RU";

    }

    setQuizParam({
        lang,
        type
    }) {
        this.lang = lang;
        this.type = type;
    }

    sayWrong() {
        return this.speech.say(this.translate("Wrong!"), {
            lang: this.lang
        });
    }

    sayShowLetter(letter) {
        return this.speech.say(this.translate(`Show the ${this.type == "numbers" ? "number": "letter"}`), {
            lang: this.lang
        }).then(() => {
            return this.speech.say(`[${letter}]`, {
                rate: 0.6,
                lang: this.lang
            });
        });
    }

    sayCongrats() {
        return this.speech.say(this.translate("You are right, well done!"), {
            lang: this.lang
        });
    }

    translate(text) {
        return this.translation.translate(text, this.lang);
    }
}
