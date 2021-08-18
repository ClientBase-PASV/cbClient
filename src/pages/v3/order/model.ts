import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryOrderCreate,
  queryOrderDeleteById,
  queryOrderGetById,
  queryOrderGetStats,
  queryOrderSearch,
  queryOrderUpdateById,
} from '@/pages/v3/order/queries';
import { IOrder, IOrderStats } from '@/pages/v3/order/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';
import { history } from '@@/core/history';

export interface IState {
  orderList?: IOrder[];
  orderStats?: IOrderStats;
  orderPager?: IPager;
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
  namespace: 'v3Order',

  state: {},

  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryOrderSearch, payload);
      yield put({
        type: 'save',
        payload: {
          orderList: get(data, 'payload.items'),
          orderPager: get(data, 'payload.pager'),
        },
      });
    },

    *getStats(_, { call, put }) {
      const data = yield call(queryOrderGetStats);
      yield put({
        type: 'save',
        payload: { orderStats: data.payload },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryOrderDeleteById, payload.orderId);
      yield put({ type: 'search', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },

    *create({ payload }, { call, put }) {
      yield call(queryOrderCreate, payload);
      yield put({ type: 'search' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/v3/order');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { orderInfo: {} } });
      const data = yield call(queryOrderGetById, payload);
      yield put({ type: 'save', payload: data.payload });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryOrderUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'search', payload: payload.queryParams });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
