import { get, patch, post, del } from '@/utils/httpMethods';
import { IClient, IClientQueryParams } from '@/pages/v4/client/types';

export async function queryClientCreate(payload: any): Promise<any> {
  return post({ url: '/v4/client', data: payload });
}

export async function queryClientGetById(id: string): Promise<any> {
  return get({ url: `/v4/client/${id}` });
}

export async function queryClientUpdateById(payload: { clientId: string; values: IClient }): Promise<any> {
  return patch({ url: `/v4/client/${payload.clientId}`, data: payload.values });
}

export async function queryClientDeleteById(clientId: string): Promise<any> {
  return del({ url: `/v4/client/${clientId}` });
}

export async function queryClientSearch(payload: IClientQueryParams): Promise<any> {
  return post({ url: '/v4/client/search', data: payload });
}

export async function queryClientGetAll(): Promise<any> {
  return get({ url: '/v4/client' });
}

export async function queryClientGetStats(): Promise<any> {
  return get({ url: `/v4/client/stats` });
}
