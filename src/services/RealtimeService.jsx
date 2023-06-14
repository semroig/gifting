import { appwriteClient } from "clients";

export class RealtimeService {
  async updateDocuments() {
    const resp = appwriteClient.updateDocumentEvent();
    return resp;
  }
}
