import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const UserSettingsEditSecurityForm = (props) => {
  return (
    <Form {...layout} onFinish={props.onFinish}>
      <Form.Item name="oldEmail" label="Old email">
        <Input />
      </Form.Item>

      <Form.Item name="newEmail" label="New email">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Update Email
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSettingsEditSecurityForm;
