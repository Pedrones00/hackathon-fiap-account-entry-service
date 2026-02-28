import { Sequelize } from 'sequelize';

import AccountResponseDTO from "../model/dto/accountResponseDTO.js";
import ThrowError from "../utils/throwError.js";
import { raw } from 'express';
import CpfResponseDTO from '../model/dto/cpfResponseDTO.js';
import AgencyAccountResponseDTO from '../model/dto/agencyAccountResponseDTO.js';

class AccountService {

    constructor(AccountEntryModel) {
        this.accountEntryModel = AccountEntryModel;
    }

    async getAll(agency, account, category, entryName) {
        let filter = {}

        if (agency && account) {
            filter = {
                agency: agency,
                account: account
            }
        }

        if (category) filter['isCategorized'] = category;

        if(entryName) filter['entryName'] = entryName;

        const accountEntrys = await this.accountEntryModel.findAll({
            where: {
                ...filter 
            },
            order: [['entryTs', 'DESC']],
            raw: true
        });

        return accountEntrys.map((entry) => new AccountResponseDTO(entry));
    }

    async getAllUsers(){
        const users = await this.accountEntryModel.findAll({
            attributes: ['cpf'],
            group: ['cpf'],
            raw: true
        });
        
        return users.map(entry => new CpfResponseDTO(entry));
    }

    async getById(id) {
        const accountEntry = await this.accountEntryModel.findByPk(id);

        if (!accountEntry) ThrowError.throwError(404, 'Entry does not exist');

        return new AccountResponseDTO(accountEntry);
    }

    async getAccountsByCpf(cpf) {
        const agencyAccounts = await this.accountEntryModel.findAll({
            attributes: ['agency', 'account'],
            where: {cpf: cpf},
            group: ['agency', 'account'],
            raw: true
        });

        return agencyAccounts.map(entry => new AgencyAccountResponseDTO(entry));
    }

    async register(data) {
        const {cpf, agency, account, entryName, value, entryType} = data;

        const entry = await this.accountEntryModel.create(
            {
                cpf: cpf,
                agency: agency,
                account: account,
                entryName: entryName,
                value: value,
                entryType: entryType
            }
        );

        return new AccountResponseDTO(await entry.reload());
    }

    async categorize(id, data) {
        const {category} = data;

        const accountEntry = await this.accountEntryModel.findByPk(id);

        if (!accountEntry) ThrowError.throwError(404, 'Entry does not exist');

        await accountEntry.update({category: category, isCategorized: true});

        return new AccountResponseDTO(await accountEntry.reload());

    }

    async removeCategory(id) {
        const accountEntry = await this.accountEntryModel.findByPk(id);

        if (!accountEntry) ThrowError.throwError(404, 'Entry does not exist');

        await accountEntry.update({category: null, isCategorized: false});

        return;
    }
}

export default AccountService;