import { Router } from "express";

// Routes
import auth from './auth';

const router = Router();

interface Routes {
    path: string;
    route: Router;
}

const routes: Routes[] = [
    {
        path: '/auth',
        route: auth
    }
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;