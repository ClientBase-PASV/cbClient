import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import slackIcon from '@/icons/slack.svg';
import { get } from 'lodash';
import { Row, Col, Button, Tag } from 'antd';
import UsersListItemRoles from '@/pages/user/userSearch/search/UsersListItemRoles';
import { IUser } from '@/pages/user/userSearch/types';
import { ISidepanel, ISidepanelOpen } from '@/pages/utils/sidepanel/types';
import CountryFlag from '@/pages/user/userSearch/search/CountryFlag';

const slackTeamId = 'T83EK681G';

const loadId = { getSlackIdButton: 'getSlackIdButton', impersonateButton: 'impersonateButton' };

interface IProps {
  item: IUser;
  usersRolesList: string[];
  loader: { args: boolean };
  usersUpdateRoleById: (values: { roles: string[]; userId: string }) => void;
  userVerifyEmailSend: (userId: { userId: string }) => void;
  open: ISidepanelOpen;
  userGetSlackId: (args: { userId: string; loadId: string }) => void;
  userImpersonate: (args: { userId: string; loadId: string }) => void;
}

const UsersListItem = (props: IProps) => {
  const { usersUpdateRoleById, userVerifyEmailSend, usersRolesList, userImpersonate, userGetSlackId } = props;

  const createdAt = get(props, 'item.createdAt', '');
  const lastLoginDate = get(props, 'item.lastLogin.date', null);
  const lastLogin = new Date().getTime() ? moment(lastLoginDate).fromNow() : 'Never';
  const userName = get(props, 'item.name', '');
  const userId = get(props, 'item._id', ' ');
  const userAbout = get(props, 'item.about', '');
  const userGoals = get(props, 'item.goals', '');
  const userEmail = get(props, 'item.email', '');
  const userPhone = get(props, 'item.phone', '');
  const userRoles = get(props, 'item.roles', '');
  const userEmailConfirmed = get(props, 'item.emailConfirmation.confirmed', false);
  const countryName = get(props, 'item.personalAddress.countryName', '');
  const userSlackId = get(props, 'item.links.slackMemberId', '');
  const onUserRolesChange = (values: { roles: string[]; userId: string }) => {
    usersUpdateRoleById(values);
  };

  const UserDeleteHandler = () => {
    props.open({
      title: 'User Delete',
      component: 'UsersFormDelete',
      place: 'UsersList',
      data: { userId, userName },
    });
  };

  const UserSendMessage = () => {
    props.open({
      title: 'Send SMS',
      component: 'UserFormSendMessage',
      place: 'UsersList',
      data: { userId, userName },
      width: '375',
    });
  };

  return (
    <Row className="mb-3rem">
      <Col span={14}>
        <Row>
          {moment(createdAt).format('LL HH:mm')}
          Last login {lastLogin}
        </Row>

        <Row>
          <Link to={`/profile/${userId}`}>{userName}</Link>

          {userSlackId ? (
            <Button
              loading={get(props, 'loader.getSlackIdButton', false)}
              size="small"
              type={'link'}
              icon={<img src={slackIcon} alt="user slackIcon" width={16} />}
              href={`slack://user?team=${slackTeamId}&id=${userSlackId}`}
            />
          ) : (
            <Button
              loading={get(props, 'loader.getSlackIdButton', false)}
              style={{ border: 0 }}
              onClick={() => userGetSlackId({ userId, loadId: loadId.getSlackIdButton })}
              size="small"
            >
              Get Slack Id
            </Button>
          )}

          <Button
            loading={get(props, 'loader.impersonateButton', false)}
            size="small"
            type={'link'}
            onClick={() => userImpersonate({ userId, loadId: loadId.impersonateButton })}
          >
            Impersonate
          </Button>

          <UsersListItemRoles
            usersRolesList={usersRolesList}
            userRoles={userRoles}
            userId={userId}
            onChange={onUserRolesChange}
          />
        </Row>

        <Row>{userAbout}</Row>

        <Row>{userGoals}</Row>
      </Col>

      <Col span={10}>
        <Row>
          <Tag color={userEmailConfirmed && 'green'}>{userEmail}</Tag>
          <Button type="link" size="small" onClick={() => userVerifyEmailSend({ userId })}>
            confirm
          </Button>
        </Row>

        <Row>
          <CountryFlag countryName={countryName} />
          {userPhone}

          <Button onClick={UserSendMessage} size="small" ghost={true}>
            📟
          </Button>

          <Button type="link" size="small" style={{ backgroundColor: 'yellow' }}>
            confirm
          </Button>
        </Row>

        <Row>
          <Button danger onClick={UserDeleteHandler}>
            Delete
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
  usersRolesList: state.UsersDashboard.usersRolesList,
});

const mapDispatchToProps = (dispatch: any) => ({
  userVerifyEmailSend: (payload: string) => dispatch({ type: 'UsersDashboard/userVerifyEmailSend', payload }),
  usersUpdateRoleById: (payload: { roles: string[]; userId: string }) =>
    dispatch({ type: 'UsersDashboard/usersUpdateRoleById', payload }),
  userGetSlackId: (payload: { userId: string; loadId: string }) =>
    dispatch({ type: 'UsersDashboard/userGetSlackId', payload }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  userImpersonate: (payload: { userId: string; loadId: string }) =>
    dispatch({ type: 'UsersDashboard/userImpersonate', payload }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(UsersListItem);
