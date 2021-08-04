import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryVendorCreate,
  queryVendorDeleteById,
  queryVendorGetById,
  queryVendorGetStats,
  queryVendorSearch,
  queryVendorUpdateById,
} from '@/pages/v1/vendor/queries';
import { IVendor, IVendorStats } from '@/pages/v1/vendor/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';
import { history } from '@@/core/history';

export interface IState {
  vendorList?: IVendor[];
  vendorStats?: IVendorStats;
  vendorPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    search: Effect;
    getStats: Effect;
    deleteById: Effect;
    reset: Effect;
    create: Effect;
    getById: Effect;
    updateById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'v1Vendor',

  state: {},

  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryVendorSearch, payload);
      yield put({
        type: 'save',
        payload: {
          vendorList: get(data, 'payload.items'),
          vendorPager: get(data, 'payload.pager'),
        },
      });
    },

    *getStats(_, { call, put }) {
      const data = yield call(queryVendorGetStats);
      yield put({
        type: 'save',
        payload: { vendorStats: data.payload },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryVendorDeleteById, payload.vendorId);
      yield put({ type: 'search', payload: payload.queryParams });
    },

    *create({ payload }, { call, put }) {
      yield call(queryVendorCreate, payload);
      yield put({ type: 'search' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/v1/vendor');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryVendorGetById, payload);
      yield put({ type: 'save', payload: data.payload });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryVendorUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'search', payload: payload.queryParams });
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
