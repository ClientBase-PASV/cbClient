import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import Pager from '@/pages/utils/pager/Pager';
import { IEmailQueryParams } from '@/pages/email/types';
import EmailSearchList from '@/pages/email/dashboard/search/EmailSearchList';
import { IState } from '@/pages/email/model';
import EmailFilterForm from '@/pages/email/dashboard/search/EmailFilterForm';

const initialSearchForm = {
  email: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IEmailRead {
  emailId: string,
  queryParams: IEmailQueryParams
}

interface IProps {
  getStats: () => void;
  search: (arg: IEmailQueryParams) => void;
  readById: (arg: IEmailRead) => void;
  emailReset: () => void;
  EmailDashboard: IState;
}

const EmailDashboard = (props: IProps) => {
  const emailList = get(props, 'Email.emailList', []);
  const emailPager = get(props, 'Email.emailPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    return () => {
      props.emailReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.search(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IEmailQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  const onRead = (emailId: string) => {
    props.readById({
      emailId,
      queryParams: getSearchQuery()
    })
  };

  return (
    <div className="p-5">
      <EmailFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />

      {emailList.length ? (
        <>
          <EmailSearchList items={emailList} onRead={onRead}/>
          <Pager pager={emailPager} onChange={onPagerChange} />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Email: state.Email,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (payload: IEmailQueryParams) => dispatch({ type: 'Email/search', payload }),
  readById: (payload: IEmailRead) => dispatch({ type: 'Email/readById', payload }),
  emailReset: () => dispatch({ type: 'Email/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailDashboard);
