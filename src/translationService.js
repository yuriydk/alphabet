export default class TranslationService {
    constructor() {
        this.enToRus = {
            "Wrong!": "Неправильно!",
            "Show the letter": "Покажи букву",
            "You are right, well done!": "Правильно, молодец!"
        }
    }

    translate(text, lang) {
        if (lang == "en")
            return text;
        return this.enToRus[text];
    }
}
