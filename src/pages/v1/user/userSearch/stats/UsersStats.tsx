import React from 'react';
import { get } from 'lodash';
import { Row, Col, Card } from 'antd';
import { IUsersStats } from '@/pages/user/userSearch/types';

interface IProps {
  usersStats: IUsersStats;
}

const UsersStats = (props: IProps) => {
  const usersStats = get(props, 'usersStats', {});
  const total = get(usersStats, 'total', 0);
  const registeredLast10Days = get(usersStats, 'registeredLast10Days', 0);

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Total">{total}</Card>
        </Col>

        <Col span={6}>
          <Card title="Last 10 days registrations">{registeredLast10Days}</Card>
        </Col>
      </Row>
    </div>
  );
};

export default UsersStats;
