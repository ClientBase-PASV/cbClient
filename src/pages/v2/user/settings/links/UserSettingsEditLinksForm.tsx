import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

interface IProps {
  onFinish: (values: any) => void;
}

const UserSettingsEditLinksForm = (props: IProps) => {
  return (
    <Form {...layout} onFinish={props.onFinish}>
      <Form.Item name="resume" label="Google Doc resume link">
        <Input />
      </Form.Item>

      <Form.Item name="linkedIn" label="LinkedIn profile link">
        <Input addonBefore="https://www.linkedin.com/in/" />
      </Form.Item>

      <Form.Item name="facebook" label="Facebook profile link">
        <Input addonBefore="https://www.facebook.com/" />
      </Form.Item>

      <Form.Item name="github" label="GitHub profile link">
        <Input addonBefore="https://github.com/" />
      </Form.Item>

      <Form.Item name="codewarsUsername" label="Codewars profile link">
        <Input addonBefore="https://www.codewars.com/users/" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSettingsEditLinksForm;
