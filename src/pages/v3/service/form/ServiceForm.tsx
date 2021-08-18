import React from 'react';
import { Button, Form, Input } from 'antd';
import validator from '@/pages/v3/utils/validators';
import { IService } from '@/pages/v3/service/types';
import { get } from 'lodash';
import VendorSearchInput from '@/pages/v3/utils/searchInput/VendorSearchInput';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IService;
}

const ServiceForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item name="name" label="Service Name" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item label="Vendor" name="vendor" rules={[validator.require]}>
        <VendorSearchInput />
      </Form.Item>

      <Form.Item name="vendorPrice" label="Vendor price" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="clientPrice" label="Client price" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;
