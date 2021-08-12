import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
// import ServiceStats from '@/pages/v1/service/dashboard/stats/ServiceStats';
import ServiceFilterForm from '@/pages/v1/service/dashboard/search/ServiceFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IServiceQueryParams } from '@/pages/v1/service/types';
import ServiceSearchList from '@/pages/v1/service/dashboard/search/ServiceSearchList';
import ServiceDashboardControls from '@/pages/v1/service/dashboard/controls/ServiceDashboardControls';
import { IState } from '@/pages/v1/service/model';

const initialSearchForm = {
  serviceSearchParam1: '',
  serviceSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  getStats: () => void;
  search: (arg: IServiceQueryParams) => void;
  serviceReset: () => void;
  ServiceDashboard: IState;
}

const ServiceDashboard = (props: IProps) => {
  // const serviceStats = get(props, 'ServiceDashboard.serviceStats', {});
  const serviceList = get(props, 'v1Service.serviceList', []);
  const servicePager = get(props, 'v1Service.servicePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.getStats();

    return () => {
      props.serviceReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.search(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IServiceQueryParams) => {
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
          <div className="h4 mr-4">Service dashboard</div>
          <ServiceFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        {/*<ServiceStats stats={serviceStats} />*/}

        <div>
          <ServiceDashboardControls />
        </div>
      </div>

      <ServiceSearchList items={serviceList} />

      <Pager pager={servicePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ServiceDashboard: state.ServiceDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (payload: IServiceQueryParams) => dispatch({ type: 'v1Service/search', payload }),
  getStats: () => dispatch({ type: 'v1Service/getStats' }),
  serviceReset: () => dispatch({ type: 'ServiceDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDashboard);
