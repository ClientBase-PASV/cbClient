import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import imgSupport from './images/Support.png';
import SupportUserTypes from '@/utils/SupportUserTypes';
import { connect } from 'umi';
import { ISupportEmail } from '@/pages/v1/staticPages/supportPage/types';
const { Dragger } = Upload;
const { Option } = Select;

interface ISupportUserType {
  name: string;
  helpWith: Array<string>;
}

interface IProps {
  sendSupportEmail: (arg: ISupportEmail) => void;
}

const Support = (props: IProps) => {
  //States for UserType and helpWith
  const [supportUserType, setSupportUserType] = useState<string>('');
  const [helpWith, setHelpWith] = useState<string>('');

  //SupportUser on change handling
  const handleSupportUserTypeChange = (name: string) => {
    setSupportUserType(name);
    form.setFieldsValue({ helpwith: null });
  };

  const handleHelpWithChange = (item: string) => {
    setHelpWith(item);
  };

  //form on submit
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    //send email to support
    props.sendSupportEmail({
      email: values.email,
      helpWith: values.helpwith,
      userType: values.usertype,
      emailMessage: values.message,
      attachment: values.attachment || '',
    });
    form.resetFields();
  };

  //user type select box options
  const userTypeOptions = SupportUserTypes.userTypes.map((el: ISupportUserType) => (
    <Option key={el.name} value={el.name} className="font-weight-bold">
      {el.name}
    </Option>
  ));

  //selected support user object
  const selectedSupportUserType = SupportUserTypes.userTypes.filter(
    (el: ISupportUserType) => el.name === supportUserType,
  );

  //helpWith select box options
  const helpWithOptions =
    selectedSupportUserType && selectedSupportUserType.length
      ? selectedSupportUserType[0].helpWith.map((el: string) => (
          <Option key={el} value={el} className="font-weight-bold">
            {el}
          </Option>
        ))
      : [];

  const [form] = Form.useForm();

  const validator = {
    require: {
      required: true,
      message: 'Required',
    },
  };

  //file upload support properties antd
  const propsUpload = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6">
            <img src={imgSupport} className="align-content-center w-100" alt="ClientBase Support" title="ClientBase" />
          </div>

          <div className="col-lg-6">
            <Form name="support" layout="vertical" onFinish={onFinish} form={form}>
              <h1 className="mb-4">ClientBase Support</h1>

              <Form.Item name="usertype" label="I am a...">
                <Select onChange={handleSupportUserTypeChange} placeholder="Select User Type">
                  {userTypeOptions}
                </Select>
              </Form.Item>

              <Form.Item name="helpwith" label="What can we help you with?">
                <Select
                  onChange={handleHelpWithChange}
                  value={helpWith}
                  placeholder="Select Topic"
                  disabled={!supportUserType.length}
                >
                  {helpWithOptions}
                </Select>
              </Form.Item>

              <Form.Item name="email" label="Email address" rules={[{ type: 'email' }, validator.require]}>
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item name="message" label="Please describe your problem in details">
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
              </Form.Item>

              <Form.Item name="attachments" label="Attachments" valuePropName="file">
                <Dragger {...propsUpload}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined style={{ fontSize: '24px' }} />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <span className="ant-upload-hint">Support for a single or bulk upload.</span>
                </Dragger>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button float-end">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  sendSupportEmail: (payload: ISupportEmail) => dispatch({ type: 'User/sendSupportEmail', payload }),
});

export default connect(null, mapDispatchToProps)(Support);
