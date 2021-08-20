import { Effect, Reducer } from 'umi';
import defaultReducers from '@/utils/defaultReducers';
import { get } from 'lodash';

import { queryClientSearch } from '@/pages/v4/client/queries';
import { queryOrderSearch } from '@/pages/v4/order/queries';
import { queryVendorSearch } from '@/pages/v4/vendor/queries';
import { queryServiceSearch } from '@/pages/v4/service/queries';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    clientSearch: Effect;
    orderSearch: Effect;
    vendorSearch: Effect;
    serviceSearch: Effect;
    open: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'v4SearchInput',

  state: {},

  effects: {
    *clientSearch({ payload }, { call, put }) {
      const data = yield call(queryClientSearch, { name: payload });
      yield put({
        type: 'save',
        payload: {
          client: get(data, 'payload.items'),
        },
      });
    },

    *orderSearch({ payload }, { call, put }) {
      const data = yield call(queryOrderSearch, payload);
      yield put({
        type: 'save',
        payload: {
          order: get(data, 'payload.items'),
        },
      });
    },

    *vendorSearch({ payload }, { call, put }) {
      const data = yield call(queryVendorSearch, payload);
      yield put({
        type: 'save',
        payload: {
          vendor: get(data, 'payload.items'),
        },
      });
    },

    *serviceSearch({ payload }, { call, put }) {
      const data = yield call(queryServiceSearch, payload);
      yield put({
        type: 'save',
        payload: {
          service: get(data, 'payload.items'),
        },
      });
    },

    *open({ payload }, { put }) {
      yield put({ type: 'save', payload: { open: true, ...payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
