import { appwriteClient } from "clients";

export class QuizesService {
  async getAllQuizes() {
    const { documents: quizes } = await appwriteClient.quizes.listDocuments();
    return quizes;
  }

  async create(profile, responses) {
    const data = {
      Name: profile.name,
      Age: profile.age,
      Gender: profile.gender,
      QuestionsAnswers: JSON.stringify(responses),
    };

    const results = await appwriteClient.quizes.createDocument(data);
    // !TODO: el tema de la session es necesario para poder crear un registro en appwrite.
    // primero resolver ese tema para continuar haciendo pruebas.
    console.log({ results });
  }
}
