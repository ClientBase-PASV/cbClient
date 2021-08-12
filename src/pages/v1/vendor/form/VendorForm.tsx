import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/pages/v1/utils/validators';
import { IVendor } from '@/pages/v1/vendor/types';
import { get } from 'lodash';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IVendor;
}

const VendorForm = (props: IProps) => {
  //  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues}>
      <Form.Item name="name" rules={[validator.require]}>
        <Input placeholder="Vendor Name" />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea placeholder="Vendor Description" autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      {/*<Form.Item name="accessType" rules={[validator.require]}>*/}
      {/*  <Select placeholder="Access type">*/}
      {/*    <Option value="members">Members</Option>*/}
      {/*    <Option value="all">All</Option>*/}
      {/*  </Select>*/}
      {/*</Form.Item>*/}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VendorForm;
