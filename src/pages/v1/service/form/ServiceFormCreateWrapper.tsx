import React, { useEffect } from 'react';
import { connect } from 'umi';
import ServiceForm from '@/pages/v1/service/form/ServiceForm';
import { IService } from '@/pages/v1/service/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IService) => void;
  search: () => void;
  loadingEffects: ILoadingEffects;
}

const ServiceFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IService) => {
    props.create(values);
  };

  useEffect(() => {
    props.search();
  }, []);

  const isLoading = get(props, 'loadingEffects.v1ServiceForm/create', false);
  const vendorList = get(props, 'vendorList', []);

  return <ServiceForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} vendorList={vendorList} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  vendorList: state.v1ServiceForm.vendorList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IService) => dispatch({ type: 'v1Service/create', payload }),
  search: () => dispatch({ type: 'v1Service/search' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFormCreateWrapper);
