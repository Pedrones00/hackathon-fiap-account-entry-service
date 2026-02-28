class ParamsCpfDTO {
    constructor(request) {
        this.validatedParamCpf = String(request.params.cpf);
        this.nameValidatedProperties = 'validatedParamCpf';
    }

    static validate(request) {
        const errors = [];
        const data = request.params.cpf;

        if (!data || String(data).trim().length !== 11) {
            errors.push('The entry CPF must be a string with 11 characters.');
        }

        return errors;
    }
}

export default ParamsCpfDTO;