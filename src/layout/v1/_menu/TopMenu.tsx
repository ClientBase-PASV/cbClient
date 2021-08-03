import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';
import { IUserAccount } from '@/pages/v1/user/userSearch/types';
import { versionFromProps } from '@/utils/heplers';

interface IProps {
  User: IUserAccount;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'User.acl', []);

  const mainMenu = [
    { path: `/v1/base`, name: 'Base', perm: 'base.get.own' },
    { path: `/v1/client`, name: 'Clients', perm: 'client.get.own' },
    { path: `/v1/order`, name: 'Orders', perm: 'order.get.own' },
    { path: `/v1/vendor`, name: 'Vendors', perm: 'vendor.get.own' },
    { path: `/v1/service`, name: 'Services', perm: 'service.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  return (
    <div id="top-menu" role="menu" className="flex">
      {mainMenu.map(
        (el) =>
          el.isVisible && (
            <div className={classNames('mr-2', { active: el.isActive })} key={el.path}>
              <Link to={el.path}>{el.name}</Link>
            </div>
          ),
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.v1User,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
