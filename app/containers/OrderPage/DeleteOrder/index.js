import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { deleteOrderRequest } from '../actions';

function DeleteOrder({ isShowModalDelete, setIsShowModalDelete, id }) {
  const dispatch = useDispatch();
  const deleteOrder = idOrder => dispatch(deleteOrderRequest(idOrder));

  const handleOk = () => {
    deleteOrder(id);
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

DeleteOrder.propTypes = {
  isShowModalDelete: PropTypes.bool,
  setIsShowModalDelete: PropTypes.func,
  id: PropTypes.string,
};

export default DeleteOrder;
