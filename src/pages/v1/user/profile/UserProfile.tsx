import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get, isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import UserRoles from '@/pages/user/profile/UserRoles';

const UserProfile = (props: any) => {
  const userId = get(props, 'match.params.userId', '');

  const userInfo = get(props, 'userInfo', '');
  const userName = get(userInfo, 'name', '');
  const roles = get(userInfo, 'roles', []);
  const about = get(userInfo, 'about', '');
  const email = get(userInfo, 'email', '');

  useEffect(() => {
    props.userGetById(userId);
  }, []);

  return (
    <div>
      <h1>Profile {userName}</h1>
      <Row>{!isEmpty(roles) ? <UserRoles roles={roles} /> : null}</Row>

      <Row>
        {about ? (
          <Col span={12}>
            <h3>About</h3>
            <div>{about}</div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.Profile.userInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: any) => dispatch({ type: 'Profile/userGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
