class AccountController {

    constructor(AccountService){
        this.accountService = AccountService;
    }

    async listAll(request, response) {
        try {
            if (request.headers['x-internal-service']) console.log(`[Inbound] - from ${request.headers['x-internal-service']} - Received request for list entries - ${new Date().toISOString()}`);

            const accountEntrys = await this.accountService.getAll(request.validatedQueryAgency, request.validatedQueryAccount, request.validatedQueryCategory, request.validatedQueryEntry);
            return response.status(200).json(accountEntrys);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getAllUsers(request, response) {
        try {
            if (request.headers['x-internal-service']) console.log(`[Inbound] - from ${request.headers['x-internal-service']} - Received request for list cpf users - ${new Date().toISOString()}`);

            const users = await this.accountService.getAllUsers();
            return response.status(200).json(users);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getById(request, response) {
        try {
            if (request.headers['x-internal-service']) console.log(`[Inbound] - from ${request.headers['x-internal-service']} - Receive request for return the entry ${request.validatedParamId} - ${new Date().toISOString()}`);

            const accountEntry = await this.accountService.getById(request.validatedParamId);
            return response.status(200).json(accountEntry);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getAccountsByCpf(request, response) {
        try {
            if (request.headers['x-internal-service']) console.log(`[Inbound] - from ${request.headers['x-internal-service']} - Receive request for agency|accounts for the cpf ${request.validatedParamCpf} - ${new Date().toISOString()}`);

            const accounts = await this.accountService.getAccountsByCpf(request.validatedParamCpf);
            return response.status(200).json(accounts);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async registerEntry(request, response) {
        try {
            if (request.headers['x-internal-service']) console.log(`[Inbound] - from ${request.headers['x-internal-service']} - Receive request register a new entry - ${new Date().toISOString()}`);

            const accountEntry = await this.accountService.register(request.validatedBodyDTOProperties);
            return response.status(201).json({
                    message: 'Entry processed successfully.',
                    data: accountEntry
                });
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
        
    }

    async categorize(request, response) {
        try {
            if (request.headers['x-internal-service']) console.log(`[Inbound] - from ${request.headers['x-internal-service']} - Received category for entry: ${request.validatedParamId} - ${new Date().toISOString()}`);

            const accountEntry = await this.accountService.categorize(request.validatedParamId, request.validatedDTOProperties);
            return response.status(200).json({
                    message: 'Entry categorized successfully.',
                    data: accountEntry
                });
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async removeCategory(request, response) {
        try {
            if (request.headers['x-internal-service']) console.log(`[Inbound] - from ${request.headers['x-internal-service']} - Received request to remove category for entry: ${request.validatedParamId} - ${new Date().toISOString()}`);

            await this.accountService.removeCategory(request.validatedParamId);
            return response.status(204).send();
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

}

export default AccountController;