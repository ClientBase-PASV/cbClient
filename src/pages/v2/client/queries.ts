import { get, patch, post, del } from '@/utils/httpMethods';
import { IClient, IClientQueryParams } from '@/pages/v2/client/types';

export async function queryClientCreate(payload: any): Promise<any> {
  return post({ url: '/v2/client', data: payload });
}

export async function queryClientGetById(id: string): Promise<any> {
  return get({ url: `/v2/client/${id}` });
}

export async function queryClientUpdateById(payload: { clientId: string; values: IClient }): Promise<any> {
  return patch({ url: `/v2/client/${payload.clientId}`, data: payload.values });
}

export async function queryClientDeleteById(clientId: string): Promise<any> {
  return del({ url: `/v2/client/${clientId}` });
}

export async function queryClientSearch(payload: IClientQueryParams): Promise<any> {
  return post({ url: '/v2/client/search', data: payload });
}

export async function queryClientGetAll(): Promise<any> {
  return get({ url: '/v2/client' });
}

export async function queryClientGetStats(): Promise<any> {
  return get({ url: `/v2/client/stats` });
}
