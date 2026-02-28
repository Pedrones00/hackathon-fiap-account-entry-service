import express from 'express';
import initController from '../controller/index.js'
import ValidationMiddleware from '../middlewares/validationMiddleware.js';
import AccountEntryRegisterDTO from '../model/dto/accountEntryRegisterDTO.js';
import ParamsIdDTO from '../model/dto/paramsIdDTO.js';
import AccountUpdateDTO from '../model/dto/accountUpdateDTO.js';
import ParamsCpfDTO from '../model/dto/paramsCpfDTO.js';
import QueryAccountDTO from '../model/dto/queryAccountDTO.js';
import QueryAgencyDTO from '../model/dto/queryAgencyDTO.js';
import QueryCategoryDTO from '../model/dto/queryCategoryDTO.js';
import QueryEntryNameDTO from '../model/dto/queryEntryNameDTO.js';

export default async () => {

    const { accountController } = await initController();

    const routes = express.Router();

    routes.get(
        '/account-entries',
        ValidationMiddleware.validate(QueryAccountDTO),
        ValidationMiddleware.validate(QueryAgencyDTO),
        ValidationMiddleware.validate(QueryCategoryDTO),
        ValidationMiddleware.validate(QueryEntryNameDTO),
        async (request, response) => accountController.listAll(request, response)
    );
    routes.get(
        '/account-entries/:id',
        ValidationMiddleware.validate(ParamsIdDTO),
        async (request, response) => accountController.getById(request, response)
    );
    routes.get(
        '/account-entries/cpf/list',
        async (request, response) => accountController.getAllUsers(request, response)
    );
    routes.get(
        '/account-entries/:cpf/agency-account',
        ValidationMiddleware.validate(ParamsCpfDTO),
        async (request, response) => accountController.getAccountsByCpf(request, response)
    )
    routes.post(
        '/account-entries',
        ValidationMiddleware.validate(AccountEntryRegisterDTO),
        async (request, response) => accountController.registerEntry(request, response)
    );
    routes.patch(
        '/account-entries/:id/category',
        ValidationMiddleware.validate(ParamsIdDTO),
        ValidationMiddleware.validate(AccountUpdateDTO),
        async (request, response) => accountController.categorize(request, response)
    );
    routes.delete(
        '/account-entries/:id/category',
        ValidationMiddleware.validate(ParamsIdDTO),
        async (request, response) => accountController.removeCategory(request, response)
    )

    return routes;

}