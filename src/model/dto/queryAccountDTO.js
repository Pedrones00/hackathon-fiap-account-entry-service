class QueryAccountDTO {

    constructor(request) {
        this.validatedQueryAccount = request.query.account? String(request.query.account) : undefined;
        this.nameValidatedProperties = 'validatedQueryAccount';
    }

    static validate(request) {
        const errors = [];
        const data = request.query.account;

        if (data && (String(data).trim().length > 10 || String(data).trim().length < 1)) {
            errors.push('Account must have 10 characters maximum');
        }

        return errors;
    }

}

export default QueryAccountDTO;