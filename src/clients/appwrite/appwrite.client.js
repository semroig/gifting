import { Client, Databases } from "appwrite";
import { appwriteConfig } from "config"

const client = new Client();

client
  .setEndpoint(appwriteConfig.ENDPOINT)
  .setProject(appwriteConfig.PROJECT_ID);

const databases = new Databases(client);

const questions = (queries) => {
  return databases.listDocuments(
    appwriteConfig.GIFTING_DB_ID,
    appwriteConfig.QUESTION_COLLECTION_ID,
    queries && [queries]
  );
}

export default {
  questions
}
