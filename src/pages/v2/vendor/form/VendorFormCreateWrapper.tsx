import React from 'react';
import { connect } from 'umi';
import VendorForm from '@/pages/v2/vendor/form/VendorForm';
import { IVendor } from '@/pages/v2/vendor/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IVendor) => void;
  loadingEffects: ILoadingEffects;
}

const VendorFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IVendor) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.v2Vendor/create', false);

  return <VendorForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IVendor) => dispatch({ type: 'v2Vendor/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorFormCreateWrapper);
