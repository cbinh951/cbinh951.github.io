import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

import { addUserRequest } from '../actions';

import './styles.scss';

function AddUser() {
  const dispatch = useDispatch();
  const onAddUser = params => dispatch(addUserRequest(params));

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = values => {
    onAddUser(values);
    setIsModalVisible(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="small"
        className="btn-add-user"
      >
        Add user
      </Button>
      <Modal
        title="Add User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button form="formUser" key="submit" htmlType="submit">
            Create
          </Button>,
        ]}
      >
        <Form
          id="formUser"
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
            resetFields
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input password!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddUser;
