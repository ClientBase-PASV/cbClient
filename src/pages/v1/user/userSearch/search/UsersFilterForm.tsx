import React from 'react';
import { Input, Select, Col, Row, Form } from 'antd';
import { debounce } from 'lodash';
import { IUsersSearchTerms } from '@/pages/user/userSearch/types';

const { Option } = Select;

interface IProps {
  filters: IUsersSearchTerms;
  selectOptions: {
    usersRolesList: string[];
  };
  onChange: (arg: IUsersSearchTerms) => void;
}

const UsersFilterForm = (props: IProps) => {
  const { onChange, filters, selectOptions } = props;

  const debounceInput = debounce((allValues) => {
    onChange(allValues);
  }, 700);

  return (
    <Form
      layout="vertical"
      className="mt-3rem mb-3rem"
      initialValues={filters}
      onValuesChange={(changedValues, allValues) => debounceInput(allValues)}
    >
      <Row gutter={6}>
        <Col span={8}>
          <Form.Item name="name" label="Name">
            <Input size="large" placeholder="Search by Name..." />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="email" label="Email">
            <Input size="large" placeholder="Search by Email..." />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="phone" label="Phone">
            <Input size="large" placeholder="Search by Phone..." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={6} justify="start">
        <Col span={8}>
          <Form.Item name="role" label="Roles">
            <Select showSearch allowClear={true} size="large" placeholder="Select...">
              {selectOptions.usersRolesList.map((el) => (
                <Option value={el} key={el}>
                  {el}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UsersFilterForm;
