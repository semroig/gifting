import { Client, Databases, Account, ID } from "appwrite";
import { appwriteConfig } from "config";

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
};

const products = (queries) => {
  return databases.listDocuments(
    appwriteConfig.GIFTING_DB_ID,
    appwriteConfig.PRODUCT_COLLECTION_ID,
    queries && [queries]
  );
};

// Revisar docu de Create Email Verification
const createAccount = (body) => {
  return account.create(ID.unique(), body.email, body.password, body.name);
};

const createEmailSession = (body) => {
  return account.createEmailSession(body.email, body.password);
};

const deleteSession = () => {
  return account.deleteSession(sessionStorage.getItem("sessionId"));
};

/**
 * Incorporar el patron Factory para poder tener la misma clase con los mismos metodos
 * para diferentes recursos/collecciones. Los metodos siempre son los mismos.
 * listDocuments, createDocument, getDocument, updateDocument, deleteDocument
 */
class Quizes {
  constructor(dbId, collectionId) {
    this.giftingDbId = dbId;
    this.collectionId = collectionId;
  }

  async listDocuments(queries) {
    return await databases.listDocuments(
      this.giftingDbId,
      this.collectionId,
      queries && [queries]
    );
  }

  async createDocument(data) {
    return databases.createDocument(
      this.giftingDbId,
      this.collectionId,
      ID.unique(),
      data
    );
  }
}

// Reemplazar con ids de variables de entorno
const updateDocumentEvent = () => {
  return client.subscribe("documents", (response) => {
    console.log("response realtime");
    console.log(response);

    if (response.payload.Results.length) {
      console.log("estoy en el if the results");
      // Save session id on session storage
      sessionStorage.setItem("resultIds", response.payload.Results);
    }
  });
};

export default {
  questions,
  createAccount,
  createEmailSession,
  deleteSession,
  quizes: new Quizes(
    appwriteConfig.GIFTING_DB_ID,
    appwriteConfig.QUIZ_COLLECTION_ID
  ),
  updateDocumentEvent,
  products,
};
