import React from 'react';
import moment from 'moment';
import { get } from 'lodash';
import { Row, Col } from 'antd';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const UserDiaryListItem = (props: any) => {
  const createdAt = get(props, 'item.createdAt', '');
  const hours = get(props, 'item.hours', '');
  const description = get(props, 'item.description', '');

  return (
    <Collapse accordion>
      <Panel header={moment(createdAt).format('LL HH:mm')} key="1">
        <p>
          <Row>
            <Col span={20}>
              <p className="mb-0">{description}</p>
            </Col>
            <Col span={4}>
              {hours && (
                <small>
                  Spent {hours} hour{hours > 1 ? 's' : ''}.{' '}
                </small>
              )}
            </Col>
          </Row>
        </p>
      </Panel>
    </Collapse>
  );
};

export default UserDiaryListItem;
