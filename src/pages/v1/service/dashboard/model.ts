import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryServiceDeleteById, queryServiceGetStats, queryServiceSearch } from '@/pages/v1/service/queries';
import { IService, IServiceStats } from '@/pages/v1/service/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  serviceList?: IService[];
  serviceStats?: IServiceStats;
  servicePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    serviceSearch: Effect;
    serviceGetStats: Effect;
    serviceDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ServiceDashboard',

  state: {},

  effects: {
    *serviceSearch({ payload }, { call, put }) {
      const data = yield call(queryServiceSearch, payload);
      yield put({
        type: 'save',
        payload: {
          serviceList: get(data, 'payload.items'),
          servicePager: get(data, 'payload.pager'),
        },
      });
    },

    *serviceGetStats(_, { call, put }) {
      const data = yield call(queryServiceGetStats);
      yield put({
        type: 'save',
        payload: { serviceStats: data.payload },
      });
    },

    *serviceDeleteById({ payload }, { call, put }) {
      yield call(queryServiceDeleteById, payload.serviceId);
      yield put({ type: 'serviceSearch', payload: payload.queryParams });
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
