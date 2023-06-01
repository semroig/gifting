import { appwriteClient } from "clients";
import { getRandomNumber } from "utilities";


// Se podria renombrar a QuestionService (para dejarlo igual a la collection)
export class QuestionsService {
    #questions = []

    async getAllQuestions() {
        if(this.#questions.length) {
            return this.#questions
        }

        const { documents: questions } = await appwriteClient.questions();
        this.#questions = questions

        return this.#questions
    }

    async getRandomQuestion(questionsIds = []) {
        let questions = await this.getAllQuestions();

        if(questionsIds.length) {
            questions = questions.filter((question) => {
                return !questionsIds.includes(question.$id)
            })
        }
    
        const randomIndex = getRandomNumber(questions.length)
        return questions[randomIndex]
    }
}