import React, { memo, useState } from 'react';
import { Tabs } from 'antd';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import Login from './loginNew';
import Register from './register';

import './styles.scss';

const { TabPane } = Tabs;

const key = 'authenticationPage';

function Authentication() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [activeTab, setActiveTab] = useState('login');

  // const onFinish = values => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = errorInfo => {
  //   console.log('Failed:', errorInfo);
  // };

  function callback(key) {
    console.log(key);
    setActiveTab(key);
  }

  return (
    <div className="wrapper-authentication">
      <div className="wrapper-authentication-body">
        <h3 className="header">ORIGAMI MODEL</h3>
        <Tabs
        // defaultActiveKey="1"
        activeKey={activeTab}
        onChange={callback}>
          <TabPane tab="Login" key="login">
            <Login />
          </TabPane>
          <TabPane tab="Register" key="register">
            <Register setActiveTab={setActiveTab} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default memo(Authentication);
