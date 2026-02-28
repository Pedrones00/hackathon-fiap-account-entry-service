import AccountController from './accountController.js'
import initService from '../service/index.js'

export default async () => {

    const { accountService } = await initService();

    const accountController = new AccountController(accountService);

    return {
        accountController
    }

}