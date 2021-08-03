import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryBaseDeleteById, queryBaseGetStats, queryBaseSearch } from '../queries';
import { IBase, IBaseStats } from '../types';
import { IPager } from '../../utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  baseList?: IBase[];
  baseStats?: IBaseStats;
  basePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    baseSearch: Effect;
    baseGetStats: Effect;
    baseDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'BaseDashboard',

  state: {},

  effects: {
    *baseSearch({ payload }, { call, put }) {
      const data = yield call(queryBaseSearch, payload);
      yield put({
        type: 'save',
        payload: {
          baseList: get(data, 'payload.items'),
          basePager: get(data, 'payload.pager'),
        },
      });
    },

    *baseGetStats(_, { call, put }) {
      const data = yield call(queryBaseGetStats);
      yield put({
        type: 'save',
        payload: { baseStats: data.payload },
      });
    },

    *baseDeleteById({ payload }, { call, put }) {
      yield call(queryBaseDeleteById, payload.baseId);
      yield put({ type: 'baseSearch', payload: payload.queryParams });
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
