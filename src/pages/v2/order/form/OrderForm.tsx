import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/pages/v2/utils/validators';
import { IOrder } from '@/pages/v2/order/types';
import { get } from 'lodash';
import ClientSearchInput from '@/pages/v2/utils/searchInput/ClientSearchInput';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IOrder;
}

const OrderForm = (props: IProps) => {
  //  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout='vertical'>
      <Form.Item name="name" label="Order Name" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item label="Client" name="client">
        <ClientSearchInput />
      </Form.Item>

      <Form.Item name="clientPrice" label="Client Price" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="clientPaid" label="Client Paid" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="vendorPrice" label="Vendor Price" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="vendorPaid" label="Vendor Paid" rules={[validator.require]}>
        <Input />
      </Form.Item>


      <Form.Item name="description" label="Order Description">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      {/*<Form.Item name="accessType" rules={[validator.require]}>*/}
      {/*  <Select label="Access type">*/}
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

export default OrderForm;
