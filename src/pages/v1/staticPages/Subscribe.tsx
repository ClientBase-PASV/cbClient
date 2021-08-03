import React from 'react';
import { Form, Input } from 'antd';
import { Link } from 'umi';

const Subscribe = () => {
  const layout = {
    labelCol: {
      span: 9,
      offset: 8,
    },
    wrapperCol: {
      span: 8,
      offset: 8,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      layout="vertical"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item>
        <h4>Subscribe to our Newsletter</h4>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: false,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Link className="ant-btn ant-btn-primary login-form-button" to="/">
          Submit Inquiry
        </Link>
      </Form.Item>
    </Form>
  );
};
export default Subscribe;
