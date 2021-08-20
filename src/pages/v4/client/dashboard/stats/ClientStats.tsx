import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { IClientStats } from '../../types';

interface IProps {
  stats: IClientStats;
}

const ClientStats = (props: IProps) => {
  const clientStats = get(props, 'stats', '');

  // if (isEmpty(clientStats)) return null;

  const totalCount = get(clientStats, 'totalCount', '...');
  const totalCountDouble = get(clientStats, 'totalCountDouble', '...');
  const totalCountTriple = get(clientStats, 'totalCountTriple', '...');
  const totalCountTen = get(clientStats, 'totalCountTen', '...');

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total" value={totalCount} />
      </Col>

      <Col span={6}>
        <Statistic title="Trend" value={totalCountDouble} />
      </Col>

      <Col span={6}>
        <Statistic title="Users" value={totalCountTriple} />
      </Col>

      <Col span={6}>
        <Statistic title="Hits" value={totalCountTen} />
      </Col>
    </Row>
  );
};

export default ClientStats;
