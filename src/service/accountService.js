import AccountResponseDTO from "../model/dto/accountResponseDTO.js";
import ThrowError from "../utils/throwError.js";
import CpfResponseDTO from '../model/dto/cpfResponseDTO.js';
import AgencyAccountResponseDTO from '../model/dto/agencyAccountResponseDTO.js';
import 'dotenv/config';

class AccountService {

    constructor(AccountEntryModel) {
        this.accountEntryModel = AccountEntryModel;
    }

    #notifyClassifier(entry) {

        const url = `${process.env.CLASSIFIER_SERVICE_URL}${process.env.CLASSIFIER_SERVICE_ANALYSE_ENDPOINT}`

        const payload = {
            id_entry: entry.id,
            agency: entry.agency,
            account: entry.account,
            entry_name: entry.entryName
        };

        console.log(`[Outbound] Sending entry ${entry.id} to classifier service - ${new Date().toISOString()}`);

        fetch(url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Internal-Service': 'account-entry-service'},
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(3000)
            }
        )
        .then(response => {
            if (!response.ok) console.warn("[Classifier] Error status:", response.status);
        })
        .catch(error => {
            if (error.name === 'AbortError') {
            console.error("[Timeout] Classifier service took too long (>3s)");
            } else {
                console.error("[Connection Error] Classifier unreachable:", error.message);
            }
        });
    }

    async getAll(agency, account, category, entryName) {
        let filter = {}

        if (agency && account) {
            filter = {
                agency: agency,
                account: account
            }
        }

        if (category !== null && category !== undefined) filter['isCategorized'] = category;

        if(entryName) filter['entryName'] = entryName;

        console.log(category, typeof category)

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

        this.#notifyClassifier(entry);

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