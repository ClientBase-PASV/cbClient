import React from 'react';
import { Avatar, Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUser } from '@/pages/v3/user/userSearch/types';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
};

interface IProps {
  initialValues?: IUser;
  onFinish: (args: IUser) => void;
}

const UserSettingsEditProfileForm = (props: IProps) => {
  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="editProfile">
      <h2>Profile</h2>
      <div className="row">
        <div className="col">
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
        </div>

        <div className="col">
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
        </div>

        <div className="col">
          <Avatar shape="square" size={100} icon={<UserOutlined />} style={{ marginLeft: '100px' }} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Item label="Phone Number" name="phone">
            <Input />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Item label="Email address" name="email">
            <Input />
          </Form.Item>
        </div>

        <div className="col">
          <Form.Item label="Fax" name="fax">
            <Input />
          </Form.Item>
        </div>
      </div>

      <h6 style={{ marginTop: '50px' }}>Personal Address</h6>
      <Form.Item label="Address" name="address">
        <Input placeholder="Please enter personal address" />
      </Form.Item>

      <div className="row">
        <div className="col">
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Item label="Zipcode" name="zipCode">
            <Input />
          </Form.Item>
        </div>
      </div>

      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSettingsEditProfileForm;
