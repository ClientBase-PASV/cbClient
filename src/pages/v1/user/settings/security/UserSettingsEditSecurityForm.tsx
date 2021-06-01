import React from 'react';
import { Button, Form, Input } from 'antd';
import { IUser, IUserAccount } from '@/pages/user/userSearch/types';
import { get } from 'lodash';
import { IUpdatePasswordForm } from '@/pages/user/types';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

interface IProps {
  isLoading?: boolean;
  onFinish: (values: any) => void;
  initialValues?: IUser;
  timeZone?: string;
}

const UserSettingsEditSecurityForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);
  const initialValues: any = get(props, 'initialValues', {});

  const [form] = Form.useForm();

  const onFinish = (values: IUpdatePasswordForm) => {
    props.onFinish(values);
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="basic" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Old Password"
        name="password"
        rules={[{ required: true, message: 'Please input your old password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Please confirm your new password!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit">
          Update Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSettingsEditSecurityForm;
