import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import VendorStats from '@/pages/v1/vendor/dashboard/stats/VendorStats';
import VendorFilterForm from '@/pages/v1/vendor/dashboard/search/VendorFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IVendorQueryParams } from '@/pages/v1/vendor/types';
import VendorSearchList from '@/pages/v1/vendor/dashboard/search/VendorSearchList';
import VendorDashboardControls from '@/pages/v1/vendor/dashboard/controls/VendorDashboardControls';
import { IState } from '@/pages/v1/vendor/dashboard/model';

const initialSearchForm = {
  vendorSearchParam1: '',
  vendorSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  vendorGetStats: () => void;
  vendorSearch: (arg: IVendorQueryParams) => void;
  vendorReset: () => void;
  VendorDashboard: IState;
}

const VendorDashboard = (props: IProps) => {
  const vendorStats = get(props, 'VendorDashboard.vendorStats', {});
  const vendorList = get(props, 'VendorDashboard.vendorList', []);
  const vendorPager = get(props, 'VendorDashboard.vendorPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.vendorGetStats();

    return () => {
      props.vendorReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.vendorSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IVendorQueryParams) => {
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
          <div className="h4 mr-4">Vendor dashboard</div>
          <VendorFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <VendorStats stats={vendorStats} />

        <div>
          <VendorDashboardControls />
        </div>
      </div>

      <VendorSearchList items={vendorList} />
      <Pager pager={vendorPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  VendorDashboard: state.VendorDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  vendorSearch: (payload: IVendorQueryParams) => dispatch({ type: 'VendorDashboard/vendorSearch', payload }),
  vendorGetStats: () => dispatch({ type: 'VendorDashboard/vendorGetStats' }),
  vendorReset: () => dispatch({ type: 'VendorDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorDashboard);
