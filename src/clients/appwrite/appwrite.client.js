import { Client, Databases, Account, ID } from "appwrite";
import { appwriteConfig } from "config"

const client = new Client();

client
  .setEndpoint(appwriteConfig.ENDPOINT)
  .setProject(appwriteConfig.PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

const questions = (queries) => {
  return databases.listDocuments(
    appwriteConfig.GIFTING_DB_ID,
    appwriteConfig.QUESTION_COLLECTION_ID,
    queries && [queries]
  );
}

// Revisar docu de Create Email Verification
const createAccount = (body) => {
  return account.create(
    ID.unique(),
    body.email,
    body.password,
    body.name
  );
}

const createEmailSession = (body) => {
  return account.createEmailSession(
    body.email,
    body.password
  );
}

const deleteSession = (SESSION_ID) => {
  return account.deleteSession(
    SESSION_ID
  );
}

export default {
  questions, createAccount, createEmailSession, deleteSession
}