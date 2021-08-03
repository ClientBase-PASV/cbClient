import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IBaseStats } from '../../types';

interface IProps {
  stats: IBaseStats;
}

const BaseStats = (props: IProps) => {
  const baseStats = get(props, 'stats', '');

  // if (isEmpty(baseStats)) return null;

  const totalCount = get(baseStats, 'totalCount', '...');
  const totalCountDouble = get(baseStats, 'totalCountDouble', '...');
  const totalCountTriple = get(baseStats, 'totalCountTriple', '...');
  const totalCountTen = get(baseStats, 'totalCountTen', '...');

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

export default BaseStats;
