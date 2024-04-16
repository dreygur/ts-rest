import  Users from '@models/user';
const isDev = process.env.NODE_ENV === 'development'

export default function dbInit() {
    Users.sync({alter: isDev});
}
