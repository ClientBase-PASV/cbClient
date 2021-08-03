import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import BaseForm from './BaseForm';
import { IBase } from '../types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (baseId: string) => void;
  reset: () => void;
  updateById: any;
  baseInfo: IBase;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const BaseFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const baseId: string = get(props, 'sidepanel.baseId', '');

  const isLoadingGet = get(props, 'loadingEffects.BaseForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.BaseForm/updateById', false);

  useEffect(() => {
    props.getById(baseId);
  }, []);

  const onFinish = (values: IBase) => {
    props.updateById({ values, baseId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <BaseForm
      onFinish={onFinish}
      initialValues={props.baseInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  baseInfo: state.BaseForm.baseInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'BaseForm/reset' }),
  updateById: (payload: IBase) => dispatch({ type: 'BaseForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'BaseForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseFormEditWrapper));
