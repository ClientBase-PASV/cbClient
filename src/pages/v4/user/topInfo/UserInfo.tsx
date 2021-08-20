import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/v4/user/userSearch/types';
import { versionFromProps } from '@/utils/heplers';

interface IGetBack {
  adminId: string;
  adminToken: string;
}

interface IProps {
  User: IUserAccount;
  logout: () => void;
  userImpersonateGetBack: (arg: IGetBack) => void;
}

const UserInfo = (props: IProps) => {
  const version = versionFromProps(props);

  const { logout, userImpersonateGetBack } = props;
  const authUser = get(props, 'User', '');

  const userId = get(authUser, '_id', '');
  const name = get(authUser, 'name', '');
  const adminId = localStorage.getItem('adminId');
  const adminToken = localStorage.getItem('adminToken');

  const isAuthLoading = get(props, 'LoadingEffects.User/auth', false);

  if (isAuthLoading) return null;

  const menu = (
    <Menu>
      <Menu.Item key="profile" data-qa="profile">
        <Link to={`/${version}/profile/${userId}`}>Profile</Link>
      </Menu.Item>

      <Menu.Item key="settings" data-qa="settings">
        <Link to={`/${version}/settings/${userId}`}>Settings</Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout" onClick={logout} data-qa="logout">
        Logout
      </Menu.Item>

      {adminId && adminToken && (
        <Menu.Item key="userImpersonateGetBack" onClick={() => userImpersonateGetBack({ adminId, adminToken })}>
          Get back to admin
        </Menu.Item>
      )}
    </Menu>
  );

  if (name) {
    return (
      <div className="ml-auto">
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" data-qa="userInfoName" onClick={(e) => e.preventDefault()}>
            {/*{isAvatar ? <Avatar src={avatar} size="large" /> : <Avatar icon={<UserOutlined />} />}*/}
            {name}
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  } else
    return (
      <div className="m-0">
        <Link to={`/${version}/user/login`} className="mr-4" data-qa="login">
          Login
        </Link>

        <Link to={`/${version}/user/register`} className="register-button- p-3" data-qa="register">
          <strong>Get started</strong> — it's free
        </Link>
      </div>
    );
};

const mapStateToProps = (state: any) => ({
  User: state.v4User,
  LoadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch({ type: 'v4User/logout' }),
  userImpersonateGetBack: (payload: IGetBack) => dispatch({ type: 'v4UsersDashboard/userImpersonateGetBack', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));
