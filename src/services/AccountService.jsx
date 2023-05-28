import { appwriteClient } from "clients";


export class AccountService {

    async createAccount() {

        const resp = await appwriteClient.createAccount();

        return resp
    }

    async createEmailSession() {

        const resp = await appwriteClient.createEmailSession();

        return resp
    }

    async deleteSession() {

        const resp = await appwriteClient.deleteSession();

        return resp
    }
}