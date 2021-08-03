import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IService } from '@/pages/v1/service/types';
import { get } from 'lodash';
import { IVendor } from '@/pages/v1/vendor/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IService;
  vendorList: IVendor[]
}

const ServiceForm = (props: IProps) => {
  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item name="name" label="Service Name" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="vendor" label="Vendor" rules={[validator.require]}>
        <Select>
          {props.vendorList.map((el) => (
            <Option key={el._id} value={el._id}>
              {el.name}
            </Option>
          ))}
        </Select>
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
