import Users from './user';

const isDev = process.env.NODE_ENV === 'development';

/**
 * IMPORTANT: The order of the Models is important
 * to ensure the initial Table Creations
 */
const models = [
    Users
];

export default async function init() {
    if (isDev) {
        for (const model of models) {
            await model.sync({ alter: isDev });
        }
    } else {
        await Promise.all(models.map((model: any) => model.sync()));
    }
}