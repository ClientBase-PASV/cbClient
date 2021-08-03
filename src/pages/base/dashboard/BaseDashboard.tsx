import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import BaseStats from './stats/BaseStats';
import BaseFilterForm from './search/BaseFilterForm';
import Pager from '../../utils/pager/Pager';
import { IBaseQueryParams } from '../types';
import BaseSearchList from './search/BaseSearchList';
import BaseDashboardControls from './controls/BaseDashboardControls';
import { IState } from './model';

const initialSearchForm = {
  baseSearchParam1: '',
  baseSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  baseGetStats: () => void;
  baseSearch: (arg: IBaseQueryParams) => void;
  baseReset: () => void;
  BaseDashboard: IState;
}

const BaseDashboard = (props: IProps) => {
  const baseStats = get(props, 'BaseDashboard.baseStats', {});
  const baseList = get(props, 'BaseDashboard.baseList', []);
  const basePager = get(props, 'BaseDashboard.basePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.baseGetStats();

    return () => {
      props.baseReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.baseSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IBaseQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">Base dashboard</div>
          <BaseFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <BaseStats stats={baseStats} />

        <div>
          <BaseDashboardControls />
        </div>
      </div>

      <BaseSearchList items={baseList} />
      <Pager pager={basePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  BaseDashboard: state.BaseDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  baseSearch: (payload: IBaseQueryParams) => dispatch({ type: 'BaseDashboard/baseSearch', payload }),
  baseGetStats: () => dispatch({ type: 'BaseDashboard/baseGetStats' }),
  baseReset: () => dispatch({ type: 'BaseDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseDashboard);
