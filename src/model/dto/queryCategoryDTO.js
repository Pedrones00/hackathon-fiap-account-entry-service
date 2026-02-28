class QueryCategoryDTO {

    constructor(request) {
        this.validatedQueryCategory = request.query.category ? this.stringToBoolean(request.query.category) : undefined;
        this.nameValidatedProperties = 'validatedQueryCategory';
    }

    static validate(request) {
        const errors = [];
        const data = request.query.category;

        if (data && String(data).trim() !== 'true' && String(data).trim() !== 'false') {
            errors.push('Category query must be a boolean');
        }

        return errors;
    }

    stringToBoolean(string) {
        if (string === 'true') return true;
        if (string === 'false') return false;
    }

}

export default QueryCategoryDTO;