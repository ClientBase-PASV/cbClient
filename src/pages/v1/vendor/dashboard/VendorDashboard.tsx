import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
// import VendorStats from '@/pages/v1/vendor/dashboard/stats/VendorStats';
import VendorFilterForm from '@/pages/v1/vendor/dashboard/search/VendorFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IVendorQueryParams } from '@/pages/v1/vendor/types';
import VendorSearchList from '@/pages/v1/vendor/dashboard/search/VendorSearchList';
import VendorDashboardControls from '@/pages/v1/vendor/dashboard/controls/VendorDashboardControls';
import { IState } from '@/pages/v1/vendor/model';

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
  getStats: () => void;
  search: (arg: IVendorQueryParams) => void;
  vendorReset: () => void;
  VendorDashboard: IState;
}

const VendorDashboard = (props: IProps) => {
  // const vendorStats = get(props, 'Vendor.vendorStats', {});
  const vendorList = get(props, 'Vendor.vendorList', []);
  const vendorPager = get(props, 'Vendor.vendorPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.getStats();

    return () => {
      props.vendorReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.search(getSearchQuery());
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

        {/*<VendorStats stats={vendorStats} />*/}

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
  Vendor: state.v1Vendor,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (payload: IVendorQueryParams) => dispatch({ type: 'v1Vendor/search', payload }),
  getStats: () => dispatch({ type: 'v1Vendor/getStats' }),
  vendorReset: () => dispatch({ type: 'v1Vendor/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorDashboard);
