import React from 'react';
import { Link } from 'umi';
import AdminMenu from './_menu/AdminMenu';
import TopMenu from './_menu/TopMenu';
import UserInfo from '@/pages/v4/user/topInfo/UserInfo';

interface IProps {
  version: string;
}

const Navbar = ({ version }: IProps) => {
  return (
    <nav className="mx-auto h-16 flex items-center">
      <Link to={`/${version}`} className="block text-xl flex-none">
        ClientBase <span className="text-gray-400">{version}</span>
      </Link>

      <TopMenu />

      <AdminMenu />
      <UserInfo />
    </nav>
  );
};

export default Navbar;
