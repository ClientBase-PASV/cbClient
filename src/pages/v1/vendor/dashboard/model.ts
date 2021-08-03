import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryVendorDeleteById, queryVendorGetStats, queryVendorSearch } from '@/pages/v1/vendor/queries';
import { IVendor, IVendorStats } from '@/pages/v1/vendor/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  vendorList?: IVendor[];
  vendorStats?: IVendorStats;
  vendorPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    vendorSearch: Effect;
    vendorGetStats: Effect;
    vendorDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'VendorDashboard',

  state: {},

  effects: {
    *vendorSearch({ payload }, { call, put }) {
      const data = yield call(queryVendorSearch, payload);
      yield put({
        type: 'save',
        payload: {
          vendorList: get(data, 'payload.items'),
          vendorPager: get(data, 'payload.pager'),
        },
      });
    },

    *vendorGetStats(_, { call, put }) {
      const data = yield call(queryVendorGetStats);
      yield put({
        type: 'save',
        payload: { vendorStats: data.payload },
      });
    },

    *vendorDeleteById({ payload }, { call, put }) {
      yield call(queryVendorDeleteById, payload.vendorId);
      yield put({ type: 'vendorSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
