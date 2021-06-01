import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const UserSettingsEditPersonalAddressForm = (props: any) => {
  return (
    <Form {...layout} onFinish={props.onFinish}>
      <Form.Item name="firstName" label="First Name">
        <Input />
      </Form.Item>

      <Form.Item name="lastName" label="Last Name">
        <Input />
      </Form.Item>

      <Form.Item name="street" label="Street">
        <Input />
      </Form.Item>

      <Form.Item name="zipCode" label="Zip Code">
        <Input />
      </Form.Item>

      <Form.Item name="city" label="City">
        <Input />
      </Form.Item>

      <Form.Item name="state" label="State">
        <Input />
      </Form.Item>

      <Form.Item name="countryName" label="Country">
        <Input />
      </Form.Item>

      <Form.Item name="phone" label="Contact Phone">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Save Address
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSettingsEditPersonalAddressForm;
