import React from 'react';
import { connect } from 'umi';
import BaseForm from './BaseForm';
import { IBase } from '../types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IBase) => void;
  loadingEffects: ILoadingEffects;
}

const BaseFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IBase) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.BaseForm/create', false);

  return <BaseForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IBase) => dispatch({ type: 'BaseForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseFormCreateWrapper);
