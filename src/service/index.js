import AccountService from './accountService.js'
import initModel from '../model/entity/index.js'

export default async () => {

    const { AccountEntry } = await initModel();

    const accountService = new AccountService(AccountEntry);

    return {
        accountService
    }

}