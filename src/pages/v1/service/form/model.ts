import { Effect, history, Reducer } from 'umi';

import { queryServiceCreate, queryServiceGetById, queryServiceUpdateById } from '@/pages/v1/service/queries';
import defaultReducers from '@/utils/defaultReducers';
import { get } from 'lodash';
import { queryVendorSearch } from '@/pages/v1/vendor/queries';

export interface IState {}

export interface ServiceModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    vendorSearch: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const ServiceModel: ServiceModelType = {
  namespace: 'ServiceForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryServiceCreate, payload);
      yield put({ type: 'ServiceDashboard/serviceSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/service');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { serviceInfo: {} } });
      const data = yield call(queryServiceGetById, payload);
      yield put({ type: 'save', payload: { serviceInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryServiceUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'ServiceDashboard/serviceSearch', payload: payload.queryParams });
    },

    *vendorSearch(_, { call, put }) {
      const data = yield call(queryVendorSearch);
      yield put({
        type: 'save',
        payload: {
          vendorList: get(data, 'payload.items'),
        },
      });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ServiceModel;
