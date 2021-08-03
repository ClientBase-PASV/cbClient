export interface IOrder {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IOrderStats {
  totalOrder: number;
  todayOrder: number;
  monthOrder: number;
  averageOrder: number;
}

export interface IOrderQueryParams {
  limit?: number | string;
  page?: number | string;
  orderSearchParam1?: string;
  orderSearchParam2?: string;
}
