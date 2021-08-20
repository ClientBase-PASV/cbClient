import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryEmailDeleteById,
  queryEmailReadById,
  queryEmailSearch,
} from '@/pages/email/queries';
import { IEmail, IEmailStats } from '@/pages/email/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  emailList?: IEmail[];
  emailStats?: IEmailStats;
  emailPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    search: Effect;
    deleteById: Effect;
    readById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'Email',

  state: {},

  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryEmailSearch, payload);
      yield put({
        type: 'save',
        payload: {
          emailList: get(data, 'payload.items'),
          emailPager: get(data, 'payload.pager'),
        },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryEmailDeleteById, payload.emailId);
      yield put({ type: 'search', payload: payload.queryParams });
    },

    *readById({ payload }, { call, put }) {
      yield call(queryEmailReadById, payload.emailId);
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
