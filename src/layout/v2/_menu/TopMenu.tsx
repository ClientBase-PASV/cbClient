import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';
import { IUserAccount } from '@/pages/v2/user/userSearch/types';

interface IProps {
  User: IUserAccount;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'User.acl', []);

  const mainMenu = [
    { path: `/v2/base`, name: 'Base', perm: 'base.get.own' },
    { path: `/v2/client`, name: 'Clients', perm: 'client.get.own' },
    { path: `/v2/order`, name: 'Orders', perm: 'order.get.own' },
    { path: `/v2/vendor`, name: 'Vendors', perm: 'vendor.get.own' },
    { path: `/v2/service`, name: 'Services', perm: 'service.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  return (
    <div id="top-menu" role="menu" className="flex flex-grow ml-2">
      {mainMenu.map(
        (el) =>
          el.isVisible && (
            <div className={classNames('mr-2  p-1', { 'bg-indigo-100': el.isActive })} key={el.path}>
              <Link to={el.path}>{el.name}</Link>
            </div>
          ),
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.v2User,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
