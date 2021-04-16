/* eslint-disable react/prop-types */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { selectUserInfo } from 'containers/App/selectors';

import { Layout } from 'antd';

import UserPage from 'containers/UserPage';
import OrderPage from 'containers/OrderPage';
import MyOrderPage from 'containers/MyOrder';
import NotFoundPage from 'containers/NotFoundPage';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

import { getInfoUserRequest } from 'containers/App/actions';
import LoadingIndicator from 'components/LoadingIndicator';

import reducer from './reducer';
import saga from './saga';

import 'antd/dist/antd.css';

import './styles.scss';

const key = 'home';
export function HomePage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.onGetUserInfoRequest();
  }, []);

  if (Object.keys(props.userInfo).length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="my-app">
        <Layout>
          <Helmet titleTemplate="HomePage" defaultTitle="HomePage">
            <meta name="description" content="HomePage" />
          </Helmet>

          <Sidebar userInfo={props.userInfo} />
          <div className="wrapper-layout">
            <Layout>
              <Header />
              <Switch>
                {props.userInfo.roles[0] === 'user' ? (
                  <>
                    <Route exact path="/dashboard/my-order">
                      <MyOrderPage />
                    </Route>
                    <Route exact path="/dashboard">
                      <MyOrderPage />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route path="/dashboard/user">
                      <UserPage />
                    </Route>
                    <Route path="/dashboard/order">
                      <OrderPage />
                    </Route>
                    <Route exact path="/dashboard">
                      <UserPage />
                    </Route>
                  </>
                )}

                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </Layout>
          </div>
        </Layout>
      </div>
    </>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetUserInfoRequest: () => dispatch(getInfoUserRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
