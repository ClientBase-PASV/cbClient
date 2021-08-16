import React, { useEffect } from 'react';
import { connect } from 'umi';
import ServiceForm from '@/pages/v2/service/form/ServiceForm';
import { IService } from '@/pages/v2/service/types';
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

  const isLoading = get(props, 'loadingEffects.v2Service/create', false);

  return <ServiceForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Service: state.v2Service,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IService) => dispatch({ type: 'v2Service/create', payload }),
  search: () => dispatch({ type: 'v2Service/search' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFormCreateWrapper);
