import Users from '@models/user';
const isDev = process.env.NODE_ENV === 'development'

const models = [Users];
export default function init() {
  models.forEach(model => model.sync({ alter: isDev }));
}
