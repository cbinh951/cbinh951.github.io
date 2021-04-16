/* eslint-disable */
import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ userInfo }) => {
  const { pathname } = useLocation();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
    >
      <div className="logo">BinhPC</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/dashboard']}
        selectedKeys={[pathname]}
      >
        {userInfo.roles[0] === 'user' ? (
          <Menu.Item key="/dashboard/my-order" icon={<UserOutlined />}>
            <NavLink to="/dashboard/my-order">MyOrder</NavLink>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="/dashboard" icon={<UserOutlined />}>
              <NavLink to="/dashboard">User</NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/order" icon={<UserOutlined />}>
              <NavLink to="/dashboard/order">Order</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
