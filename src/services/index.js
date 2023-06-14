import { QuestionsService } from "./QuestionsService";
import { AccountService } from "./AccountService";
import { QuizesService } from "./QuizesService";
import { RealtimeService } from "./RealtimeService";

export const questionsService = new QuestionsService();
export const accountsService = new AccountService();
export const quizesService = new QuizesService();
export const realtimeService = new RealtimeService();
