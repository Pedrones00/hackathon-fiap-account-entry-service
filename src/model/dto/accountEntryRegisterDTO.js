class AccountEntryRegisterDTO {

    constructor(request) {
        this.validatedBodyDTOProperties = {
            cpf: request.body.cpf.trim(),
            agency: request.body.agency.trim(),
            account: request.body.account.trim(),
            entryName: request.body.entry_name.trim(),
            value: request.body.value,
            entryType: request.body.entry_type.trim(),
        };
        this.nameValidatedProperties = 'validatedBodyDTOProperties';
    }

    static validate(request) {
        const errors = [];
        const data = request.body;

        if (!data) return errors.push('No data');

        if (!data.cpf || typeof data.cpf !== 'string' || data.cpf.trim().length !==  11) {
            errors.push('Invalid cpf. Must be a string and have 11 characters');
        }

        if (!data.agency || typeof data.agency !== 'string' || data.agency.trim().length !==  4) {
            errors.push('Invalid agendy. Must be a numeric string and have 8 characters');
        }

        if (!data.account || typeof data.account !== 'string' || data.account.trim().length > 11 || data.account.trim().length < 1) {
            errors.push('Invalid account. Must be a string and have maximum 11 characters');
        }
    
        if (!data.entry_name || typeof data.entry_name !== 'string' || data.entry_name.trim().length > 20 || data.entry_name.trim().length < 1) {
            errors.push('Invalid entry name. Must be a string and have maximum 20 characters');
        }

        if (!data.value || typeof data.value !== 'number' || data.value <= 0) {
            errors.push('Invalid value. Must be a number greater than zero');
        }

        if (!data.entry_type || data.entry_type !== 'CREDIT' && data.entry_type !== 'DEBIT') {
            errors.push('Invalid entry type. Must be CREDIT or DEBIT');
        }

        return errors;

    }
    
}

export default AccountEntryRegisterDTO;