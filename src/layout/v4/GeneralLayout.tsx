import React from 'react';
import Sidepanel from '../../pages/utils/sidepanel/Sidepanel';
import Footer from './Footer';
import Navbar from './Navbar';
import { versionFromProps } from '@/utils/heplers';

interface IProps {
  children: any;
  location: {
    pathname: string;
  };
}

const isFooterVisible = (location: string) => {
  const allowedPaths = ['/', '/pricing', '/industries'];
  return allowedPaths.includes(location);
};

export default (props: IProps) => {
  const version = versionFromProps(props);

  return (
    <div className="container mx-auto">
      <Navbar version={version} />

      <div>{props.children}</div>

      <Sidepanel />

      {isFooterVisible(props.location.pathname) && <Footer />}
    </div>
  );
};
