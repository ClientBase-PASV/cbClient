import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
// import OrderStats from '@/pages/v1/order/dashboard/stats/OrderStats';
import OrderFilterForm from '@/pages/v1/order/dashboard/search/OrderFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IOrderQueryParams } from '@/pages/v1/order/types';
import OrderSearchList from '@/pages/v1/order/dashboard/search/OrderSearchList';
import OrderDashboardControls from '@/pages/v1/order/dashboard/controls/OrderDashboardControls';
import { IState } from '@/pages/v1/order/model';

const initialSearchForm = {
  orderSearchParam1: '',
  orderSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  getStats: () => void;
  search: (arg: IOrderQueryParams) => void;
  orderReset: () => void;
  Order: IState;
}

const OrderDashboard = (props: IProps) => {
  // const orderStats = get(props, 'Order.orderStats', {});
  const orderList = get(props, 'Order.orderList', []);
  const orderPager = get(props, 'Order.orderPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.getStats();

    return () => {
      props.orderReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.search(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IOrderQueryParams) => {
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
          <div className="h4 mr-4">Order dashboard</div>
          <OrderFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        {/*<OrderStats stats={orderStats} />*/}

        <div>
          <OrderDashboardControls />
        </div>
      </div>

      <OrderSearchList items={orderList} />
      <Pager pager={orderPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  Order: state.v1Order,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (payload: IOrderQueryParams) => dispatch({ type: 'v1Order/search', payload }),
  getStats: () => dispatch({ type: 'v1Order/getStats' }),
  orderReset: () => dispatch({ type: 'v1Order/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDashboard);
