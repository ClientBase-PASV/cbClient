import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryServiceCreate,
  queryServiceDeleteById,
  queryServiceGetById,
  queryServiceGetStats,
  queryServiceSearch,
  queryServiceUpdateById,
} from '@/pages/v3/service/queries';
import { IService, IServiceStats } from '@/pages/v3/service/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';
import { history } from '@@/core/history';
import { queryVendorSearch } from '@/pages/v3/vendor/queries';

export interface IState {
  serviceList?: IService[];
  serviceStats?: IServiceStats;
  servicePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    search: Effect;
    getStats: Effect;
    deleteById: Effect;
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'v3Service',

  state: {},

  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryServiceSearch, payload);
      yield put({
        type: 'save',
        payload: {
          serviceList: get(data, 'payload.items'),
          servicePager: get(data, 'payload.pager'),
        },
      });
    },

    *getStats(_, { call, put }) {
      const data = yield call(queryServiceGetStats);
      yield put({
        type: 'save',
        payload: { serviceStats: data.payload },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryServiceDeleteById, payload.serviceId);
      yield put({ type: 'search', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },

    *create({ payload }, { call, put }) {
      yield call(queryServiceCreate, payload);
      yield put({ type: 'search' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/v3/service');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryServiceGetById, payload);
      yield put({ type: 'save', payload: data.payload });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryServiceUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'search', payload: payload.queryParams });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
