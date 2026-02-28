class AccountUpdateDTO {

    constructor(request) {
        this.validatedDTOProperties = {
            category: request.body.category
        };
        this.nameValidatedProperties = 'validatedDTOProperties';
    }

    static validate(request) {
        const errors = [];
        const data = request.body;

        if (!data) return errors.push('No data');

        if (!data.category || typeof data.category !== 'string' || data.category.trim().length > 50 || data.category.trim().length < 1) {
            errors.push('Invalid account. Must be a string and have maximum 11 characters');
        }

        return errors;

    }
}

export default AccountUpdateDTO;