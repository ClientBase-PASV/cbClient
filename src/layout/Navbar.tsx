import React from 'react';
import { Link } from 'umi';
import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';
import UserInfo from '@/pages/user/topInfo/UserInfo';

interface IProps {
  version: string;
}

const Navbar = ({ version }: IProps) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light-">
      <Link to={`/${version}`} className="navbar-brand">
        ClientBase {version}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <AdminMenu />
      <TopMenu />
      <UserInfo />
    </nav>
  );
};

export default Navbar;
