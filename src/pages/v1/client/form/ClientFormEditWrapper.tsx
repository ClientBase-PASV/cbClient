import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import ClientForm from '@/pages/v1/client/form/ClientForm';
import { IClient } from '@/pages/v1/client/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (clientId: string) => void;
  reset: () => void;
  updateById: any;
  clientInfo: IClient;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClientFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const clientId: string = get(props, 'sidepanel.clientId', '');

  const isLoadingGet = get(props, 'loadingEffects.v1Client/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.v1Client/updateById', false);

  useEffect(() => {
    props.getById(clientId);
  }, []);

  const onFinish = (values: IClient) => {
    props.updateById({ values, clientId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ClientForm
      onFinish={onFinish}
      initialValues={props.clientInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  clientInfo: state.v1Client.clientInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'v1Client/reset' }),
  updateById: (payload: IClient) => dispatch({ type: 'v1Client/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'v1Client/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientFormEditWrapper));
