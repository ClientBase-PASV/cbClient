import React from 'react';
import { Link } from 'umi';

const menu = [
  { link: '/contact', text: 'Contact' },
  { link: '/subscribe', text: 'Subscribe' },
  { link: '/pricing', text: 'Pricing' },
  { link: '/industries', text: 'Industries' },
  { link: '/faq', text: 'FAQ' },
];

const Footer = () => {
  return (
    <footer className="mt-auto small d-flex">
      {menu.map((el) => (
        <Link key={el.link} to={el.link} className="me-2 small">
          {el.text}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
