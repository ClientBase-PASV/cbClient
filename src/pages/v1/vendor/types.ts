export interface IVendor {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IVendorStats {
  totalVendor: number;
  todayVendor: number;
  monthVendor: number;
  averageVendor: number;
}

export interface IVendorQueryParams {
  limit?: number | string;
  page?: number | string;
  vendorSearchParam1?: string;
  vendorSearchParam2?: string;
}
