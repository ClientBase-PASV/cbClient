import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const ContactPage = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const validator = {
    require: {
      required: true,
      message: 'Required',
    },
  };

  return (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
      <h1>Contact us</h1>

      <p>If you have any questions to us, please fill out and submit the following form.</p>

      <Form.Item name="name" rules={[validator.require]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
      </Form.Item>

      <Form.Item name="email" rules={[{ type: 'email' }, validator.require]}>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item name="phone" rules={[validator.require]}>
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Cell phone number '17775551122' "
        />
      </Form.Item>

      <Form.Item name={'message'}>
        <Input.TextArea placeholder="Message" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactPage;
