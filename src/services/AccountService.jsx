import { appwriteClient } from "clients";


export class AccountService {

    async createAccount(body) {

        // Deberia gestionar aca el tema de local storage del session id??

        const resp = await appwriteClient.createAccount(body);
        return resp
    }

    async createEmailSession(body) {

        // Deberia gestionar aca el tema de local storage del session id??

        const resp = await appwriteClient.createEmailSession(body);
        return resp
    }

    async deleteSession() {

        // Deberia gestionar aca el tema de local storage del session id?? -> eliminarlo

        const resp = await appwriteClient.deleteSession();
        return resp
    }
}