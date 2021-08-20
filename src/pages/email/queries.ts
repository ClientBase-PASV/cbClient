import { del, post, put } from '@/utils/httpMethods';
import { IEmailQueryParams } from '@/pages/email/types';

export async function queryEmailReadById(id: string): Promise<any> {
  return put({ url: `/email/${id}` });
}

export async function queryEmailDeleteById(emailId: string): Promise<any> {
  return del({ url: `/email/${emailId}` });
}

export async function queryEmailSearch(payload: IEmailQueryParams): Promise<any> {
  return post({ url: '/email/search', data: payload });
}
