import { appwriteClient } from "clients";

export class QuizesService {
  async getAllQuizes() {
    const { documents: quizes } = await appwriteClient.quizes();

    return quizes;
  }
}
