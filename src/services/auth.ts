import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import { autoInjectable } from "tsyringe";
import Users from '../models/user';
import ApiError from '../errors/ApiError';
import UserRepository from '../repository/user';

interface RequiredUser extends Required<Users> { };

@autoInjectable()
class AuthService {
    constructor(
        private user : UserRepository,
    ) {}
    async genPass(password: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(
            password.toString().trim(),
            salt
        );
    }

    async isEmailTaken(email: string): Promise < boolean > {
        const user = await this.user.findOne({ email });
        return !!user;
    }

    async findOne(query: Partial<Users>): Promise<Users | null> { 
        return await this.user.findOne({ where: query });
    }

    async create(user: RequiredUser): Promise<Users> {
        if (await this.isEmailTaken(user.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already registed with another user');
        }
        return await this.user.create(user);
    }

    async update(payload: Partial<Users>, query: Partial<Users>): Promise<Users | null> {
        return await this.user.update(payload, {
            where: query,
            returning: true,
        });
    }

    async drop(id: number): Promise<number> { 
        return await this.user.drop(id);
    }
}

export default AuthService;