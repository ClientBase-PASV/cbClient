import React from 'react';
import { Button, Form, Input } from 'antd';
import validator from '@/pages/v3/utils/validators';
import { IOrder } from '@/pages/v3/order/types';
import { get } from 'lodash';
import ClientSearchInput from '@/pages/v3/utils/searchInput/ClientSearchInput';
import ServiceSearchInput from '@/pages/v3/utils/searchInput/ServiceSearchInput';
import { IService } from '@/pages/v3/service/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IOrder;
}

const OrderForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);
  const [form] = Form.useForm();

  const onChangeService = (selectedService: IService) => {
    const { clientPrice, vendorPrice } = selectedService;

    form.setFieldsValue({ clientPrice, vendorPrice });
  };

  return (
    <Form form={form} onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item label="Client" name="client">
        <ClientSearchInput />
      </Form.Item>

      <Form.Item label="Service" name="service">
        <ServiceSearchInput onChange={onChangeService} />
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

      <Form.Item name="notes" label="Order Notes">
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
