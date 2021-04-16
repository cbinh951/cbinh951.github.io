import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { deleteUserRequest } from '../actions';

function DeleteUser({ isShowModalDelete, setIsShowModalDelete, id }) {
  const dispatch = useDispatch();
  const deleteUser = idUser => dispatch(deleteUserRequest(idUser));

  const handleOk = () => {
    deleteUser(id);
    setIsShowModalDelete(false);
  };

  const handleCancel = () => {
    setIsShowModalDelete(false);
  };

  return (
    <Modal
      title="Delete User"
      visible={isShowModalDelete}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete?</p>
    </Modal>
  );
}

DeleteUser.propTypes = {
  isShowModalDelete: PropTypes.bool,
  setIsShowModalDelete: PropTypes.func,
  id: PropTypes.string,
};

export default DeleteUser;
