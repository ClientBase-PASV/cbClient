import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
// import ClientStats from '@/pages/v4/client/dashboard/stats/ClientStats';
import ClientFilterForm from '@/pages/v4/client/dashboard/search/ClientFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IClientQueryParams } from '@/pages/v4/client/types';
import ClientSearchList from '@/pages/v4/client/dashboard/search/ClientSearchList';
import ClientDashboardControls from '@/pages/v4/client/dashboard/controls/ClientDashboardControls';
import { IState } from '@/pages/v4/client/model';

const initialSearchForm = {
  clientSearchParam1: '',
  clientSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  getStats: () => void;
  search: (arg: IClientQueryParams) => void;
  clientReset: () => void;
  Client: IState;
}

const ClientDashboard = (props: IProps) => {
  // const clientStats = get(props, 'Client.clientStats', {});
  const clientList = get(props, 'Client.clientList', []);
  const clientPager = get(props, 'Client.clientPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.getStats();

    return () => {
      props.clientReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.search(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IClientQueryParams) => {
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
      <div className="flex align-items-end justify-between mt-3 mb-2">
        {/*<div className="text-xl mr-4">Client dashboard</div>*/}
        <ClientFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        <ClientDashboardControls />

        {/*<ClientStats stats={clientStats} />*/}
      </div>

      <ClientSearchList items={clientList} />

      <Pager pager={clientPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  Client: state.v4Client,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (payload: IClientQueryParams) => dispatch({ type: 'v4Client/search', payload }),
  getStats: () => dispatch({ type: 'v4Client/getStats' }),
  clientReset: () => dispatch({ type: 'v4Client/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);
