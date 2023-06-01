import { appwriteClient } from "clients";


export class AccountService {

    async createAccount(body) {

        const resp = await appwriteClient.createAccount(body);
        return resp
    }

    async createEmailSession(body) {

        const resp = await appwriteClient.createEmailSession(body);
        return resp
    }

    async deleteSession() {

        const resp = await appwriteClient.deleteSession();
        return resp
    }
}