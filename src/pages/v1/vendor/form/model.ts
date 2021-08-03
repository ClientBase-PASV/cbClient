import { Effect, history, Reducer } from 'umi';

import { queryVendorCreate, queryVendorGetById, queryVendorUpdateById } from '@/pages/v1/vendor/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface VendorModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const VendorModel: VendorModelType = {
  namespace: 'VendorForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryVendorCreate, payload);
      yield put({ type: 'VendorDashboard/vendorSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/vendor');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { vendorInfo: {} } });
      const data = yield call(queryVendorGetById, payload);
      yield put({ type: 'save', payload: { vendorInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryVendorUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'VendorDashboard/vendorSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default VendorModel;
