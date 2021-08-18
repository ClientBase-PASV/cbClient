import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import ServiceForm from '@/pages/v3/service/form/ServiceForm';
import { IService } from '@/pages/v3/service/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (serviceId: string) => void;
  reset: () => void;
  vendorSearch: () => void;
  updateById: any;
  serviceInfo: IService;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ServiceFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const serviceId: string = get(props, 'Sidepanel.serviceId', '');

  const isLoadingGet = get(props, 'loadingEffects.v3Service/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.v3Service/updateById', false);

  useEffect(() => {
    props.getById(serviceId);
  }, []);

  const onFinish = (values: IService) => {
    props.updateById({ values, serviceId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ServiceForm
      onFinish={onFinish}
      initialValues={props.serviceInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
  serviceInfo: state.v3Service,
  loadingEffects: state.loading.effects,
  vendorList: state.v3Service.vendorList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'v3Service/reset' }),
  updateById: (payload: IService) => dispatch({ type: 'v3Service/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'v3Service/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceFormEditWrapper));
