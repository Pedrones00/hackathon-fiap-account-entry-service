class AccountController {

    constructor(AccountService){
        this.accountService = AccountService;
    }

    async listAll(request, response) {
        try {
            const accountEntrys = await this.accountService.getAll(request.validatedQueryAgency, request.validatedQueryAccount, request.validatedQueryCategory, request.validatedQueryEntry);
            return response.status(200).json(accountEntrys);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getAllUsers(request, response) {
        try {
            const users = await this.accountService.getAllUsers();
            return response.status(200).json(users);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getById(request, response) {
        try {
            const accountEntry = await this.accountService.getById(request.validatedParamId);
            return response.status(200).json(accountEntry);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async getAccountsByCpf(request, response) {
        try {
            const accounts = await this.accountService.getAccountsByCpf(request.validatedParamCpf);
            return response.status(200).json(accounts);
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

    async registerEntry(request, response) {
        try {
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
            await this.accountService.removeCategory(request.validatedParamId);
            return response.status(204).send();
        } catch (error) {
            return response.status(error.statusCode || 500).json({message: error.message});
        }
    }

}

export default AccountController;