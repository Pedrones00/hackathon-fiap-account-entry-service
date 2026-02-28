class QueryAgencyDTO {

    constructor(request) {
        this.validatedQueryAgency = request.query.agency ? String(request.query.agency) : undefined;
        this.nameValidatedProperties = 'validatedQueryAgency';
    }

    static validate(request) {
        const errors = [];
        const data = request.query.agency;

        if (data && String(data).trim().length !== 4) {
            errors.push('Account must have 4 characters');
        }

        return errors;
    }

}

export default QueryAgencyDTO;