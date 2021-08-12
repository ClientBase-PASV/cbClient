import React from 'react';
import { Button, Form, Input } from 'antd';
import validator from '@/pages/v2/utils/validators';
import { IClient } from '../types';
import { get } from 'lodash';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClient;
}

const ClientForm = (props: IProps) => {
  //  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item name="name" label="Full Name" rules={[validator.require, validator.clientName]}>
        <Input />
      </Form.Item>

      <Form.Item name="phone" label="Phone" rules={[validator.require, validator.phoneNumber]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>

      <Form.Item name="notes" label="Notes" rules={[validator.maxlength200]}>
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

export default ClientForm;
