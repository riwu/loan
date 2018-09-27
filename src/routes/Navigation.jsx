import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <Menu
    className={styles.container}
    theme="dark"
    mode="horizontal"
    selectedKeys={[window.location.pathname]}
  >
    {[{ label: 'Request Loan', link: '/' }, { label: 'View Loans', link: '/loans' }].map(info => (
      <Menu.Item key={info.link}>
        <Link to={info.link}>{info.label}</Link>
      </Menu.Item>
    ))}
  </Menu>
);

export default Navigation;
