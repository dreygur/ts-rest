import httpStatus from 'http-status';
import Users from '@models/user';
import ApiError from '@app/errors/ApiError';
import { boolean } from 'joi';

export async function isEmailTaken(email: string): Promise<boolean> {
  const user = await Users.findOne({ where: { email } });
  return !!user;
}
export async function create(user: any) {
  if (await isEmailTaken(user.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const a = await Users.create(user);
  console.log(a);
  return a;
}