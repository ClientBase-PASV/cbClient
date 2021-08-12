import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import VendorForm from '@/pages/v2/vendor/form/VendorForm';
import { IVendor } from '@/pages/v2/vendor/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (vendorId: string) => void;
  reset: () => void;
  updateById: any;
  vendorInfo: IVendor;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const VendorFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const vendorId: string = get(props, 'sidepanel.vendorId', '');

  const isLoadingGet = get(props, 'loadingEffects.v2Vendor/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.v2Vendor/updateById', false);

  useEffect(() => {
    props.getById(vendorId);
  }, []);

  const onFinish = (values: IVendor) => {
    props.updateById({ values, vendorId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <VendorForm
      onFinish={onFinish}
      initialValues={props.vendorInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  vendorInfo: state.v2Vendor,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'v2Vendor/reset' }),
  updateById: (payload: IVendor) => dispatch({ type: 'v2Vendor/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'v2Vendor/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorFormEditWrapper));
