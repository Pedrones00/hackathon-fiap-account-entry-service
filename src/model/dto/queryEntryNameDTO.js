class QueryEntryNameDTO {

    constructor(request) {
        this.validatedQueryEntry = request.query.entry_name;
        this.nameValidatedProperties = 'validatedQueryEntry';
    }

    static validate(request) {
        const errors = [];
        const data = request.query.entry_name;

        if (data && String(data).trim() === '') {
            errors.push('Entry name query can not be empty.');
        }

        return errors;
    }

}

export default QueryEntryNameDTO;