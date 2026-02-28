import ErrorMiddleware from '../middlewares/errorMiddleware.js';
import accountRoutes from './accountRoute.js';

export default async (app) => {

    app.use(await accountRoutes());

    app.use(ErrorMiddleware.validate());

    return app;

}