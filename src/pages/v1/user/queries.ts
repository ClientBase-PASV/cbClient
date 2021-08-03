import { get, post, patch } from '@/utils/httpMethods';
import { IUser } from '@/pages/v1/user/userSearch/types';
import {
  IResetPasswordArg,
  IValidResetPasswordLink,
  IVerifyEmailArg,
} from '@/pages/v1/user/types';
import { IVerifyEmail } from '@/pages/v1/user/account/UserEmailVerify';
import { ISupportEmail } from '@/pages/v1/staticPages/supportPage/types';
import { IRegisterForm } from '@/pages/v1/user/account/UserRegister';

export async function queryUserAuth(): Promise<any> {
  return get({ url: '/v1/user/auth' });
}

export async function queryUserLogin(payload: any): Promise<any> {
  return post({ url: '/v1/user/login', data: payload });
}

export async function queryUserRegister(payload: IRegisterForm): Promise<any> {
  return post({ url: `/v1/user`, data: payload });
}

export async function queryUserPasswordReset(payload: any): Promise<any> {
  return post({ url: '/v1/user/password/reset/request', data: payload });
}

export async function queryUserEmailVerify(payload: IVerifyEmail): Promise<any> {
  return get({ url: `/v1/user/verify/email/${payload.userId}/${payload.hash}` });
}

export async function queryIsValidResetPasswordLink(payload: IValidResetPasswordLink): Promise<any> {
  return post({ url: '/v1/user/password/reset/valid', data: payload });
}

export async function queryUserPasswordResetNew(payload: IResetPasswordArg): Promise<any> {
  return post({ url: `/v1/user/password/reset/new`, data: payload });
}

export async function queryUserSendSupportEmail(payload: ISupportEmail): Promise<any> {
  return post({ url: `/v1/user/support/email`, data: payload });
}

export async function queryUserGetById(userId: string): Promise<any> {
  return get({ url: `/v1/user/${userId}` });
}

export async function queryUserUpdateById(payload: { userId: string; values: IUser }): Promise<any> {
  return patch({ url: `/v1/user/`, data: payload.values });
}

export async function queryUserPasswordUpdate(payload: any): Promise<any> {
  return post({ url: `/v1/user/password/update/`, data: payload });
}

export async function queryUserVerifyEmailSend(data: IVerifyEmailArg): Promise<any> {
  return post({ url: '/v1/user/verify/email/send', data });
}
