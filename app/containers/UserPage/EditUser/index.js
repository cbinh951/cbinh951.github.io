import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';

import { getUserByIdRequest, editUserRequest } from '../actions';
import { selectEditUserLoading, selectUserById } from '../selectors';

function EditUser({ isShowModalEdit, id, setIsShowModalEdit, onGetListuser }) {
  const dispatch = useDispatch();
  const onEditUser = idUser => dispatch(getUserByIdRequest(idUser));
  const updateUser = user => dispatch(editUserRequest(user));

  const loading = useSelector(selectEditUserLoading());
  const infoUser = useSelector(selectUserById());

  useEffect(() => {
    if (isShowModalEdit) {
      onEditUser(id);
    }
  }, [id, isShowModalEdit]);

  const onUpdateUser = values => {
    updateUser({ values, id });
    setIsShowModalEdit(false);
    onGetListuser();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const handleCancel = () => {
    setIsShowModalEdit(false);
  };

  return (
    <>
      <Modal
        title="Edit User"
        visible={isShowModalEdit}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button form="formEditUser" key="submit" htmlType="submit">
            Save
          </Button>,
        ]}
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Form
            id="formEditUser"
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onUpdateUser}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input name!' }]}
              initialValue={infoUser.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              // rules={[{ required: true, message: 'Please input password!' }]}
              // initialValue={infoUser.password}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="isActive"
              valuePropName="checked"
              initialValue={infoUser.isActive}
            >
              <Switch />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

EditUser.propTypes = {
  isShowModalEdit: PropTypes.bool,
  setIsShowModalEdit: PropTypes.func,
  id: PropTypes.string,
  onGetListuser: PropTypes.func,
};

export default EditUser;
