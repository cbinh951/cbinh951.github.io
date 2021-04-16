import React from 'react';
import { Layout } from 'antd';
import logo from 'assets/images/banner.png';

const { Header } = Layout;

function HeaderPage() {
  return (
    <Header className="site-layout-sub-header-background ls-header">
      <div className="wrapper-logo">
        <img src={logo} alt="logo" className="img-logo" />
      </div>
    </Header>
  );
}

export default HeaderPage;
