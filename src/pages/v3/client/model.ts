import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryClientCreate,
  queryClientDeleteById,
  queryClientGetById,
  queryClientGetStats,
  queryClientSearch,
  queryClientUpdateById,
} from '@/pages/v3/client/queries';
import { IClient, IClientStats } from '@/pages/v3/client/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';
import { history } from '@@/core/history';

export interface IState {
  clientList?: IClient[];
  clientStats?: IClientStats;
  clientPager?: IPager;
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
  namespace: 'v3Client',

  state: {},

  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryClientSearch, payload);
      yield put({
        type: 'save',
        payload: {
          clientList: get(data, 'payload.items'),
          clientPager: get(data, 'payload.pager'),
        },
      });
    },

    *getStats(_, { call, put }) {
      const data = yield call(queryClientGetStats);
      yield put({
        type: 'save',
        payload: { clientStats: data.payload },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryClientDeleteById, payload.clientId);
      yield put({ type: 'search', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },

    *create({ payload }, { call, put }) {
      yield call(queryClientCreate, payload);
      yield put({ type: 'search' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/v3/client');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryClientGetById, payload);
      yield put({ type: 'save', payload: data.payload });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryClientUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'search', payload: payload.queryParams });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
