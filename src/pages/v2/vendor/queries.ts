import { get, patch, post, del } from '@/utils/httpMethods';
import { IVendor, IVendorQueryParams } from '@/pages/v2/vendor/types';

export async function queryVendorCreate(payload: any): Promise<any> {
  return post({ url: '/v2/vendor', data: payload });
}

export async function queryVendorGetById(id: string): Promise<any> {
  return get({ url: `/v2/vendor/${id}` });
}

export async function queryVendorUpdateById(payload: { vendorId: string; values: IVendor }): Promise<any> {
  return patch({ url: `/v2/vendor/${payload.vendorId}`, data: payload.values });
}

export async function queryVendorDeleteById(vendorId: string): Promise<any> {
  return del({ url: `/v2/vendor/${vendorId}` });
}

export async function queryVendorSearch(payload: IVendorQueryParams): Promise<any> {
  return post({ url: '/v2/vendor/search', data: payload });
}

export async function queryVendorGetStats(): Promise<any> {
  return get({ url: `/v2/vendor/stats` });
}
