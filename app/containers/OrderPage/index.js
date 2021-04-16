import React, { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Select, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';

import { getListOrderRequest } from './actions';
import {
  selectListOrder,
  selectPageLoading,
  selectStatusUpdateOrder,
} from './selectors';

import AddOrder from './AddOrder';

import reducer from './reducer';
import saga from './saga';

import './styles.scss';
import EditOrder from './EditOrder';
import DeleteOrder from './DeleteOrder';

const key = 'orderPage';

const { Option } = Select;

function User() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [idDelete, setIdDelete] = useState();

  const loading = useSelector(selectPageLoading());
  const listOrder = useSelector(selectListOrder());
  const statusUpdateOrder = useSelector(selectStatusUpdateOrder());

  const dispatch = useDispatch();
  const onGetListOrder = () => dispatch(getListOrderRequest());

  useEffect(() => {
    onGetListOrder();
  }, []);

  useEffect(() => {
    if (statusUpdateOrder) {
      onGetListOrder();
      setIsShowModalEdit(false);
    }
  }, [statusUpdateOrder]);

  const editUser = item => {
    setIdEdit(item.id);
    setIsShowModalEdit(true);
  };

  const deleteOrder = id => {
    setIdDelete(id);
    setIsShowModalDelete(true);
  };

  const downloadFile = url => {
    window.location.href = `https://be.origami-model-management.apps.projectlumina.com/${url}`;
  };

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping',
      key: 'shipping',
      render: shipping => <div>{shipping} VND</div>,
    },
    {
      title: 'Number page',
      dataIndex: 'numberOfPage',
      key: 'numberOfPage',
    },
    {
      title: 'Copies',
      dataIndex: 'copies',
      key: 'copies',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, row) => (
        <>
          <Select
            defaultValue={row.currentStatus.id}
            style={{ width: 120 }}
            // onChange={handleChange}
          >
            {status.map(item => (
              <Option value={item.id}>{item.value}</Option>
            ))}
          </Select>
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: item => (
        <>
          <EditOutlined
            style={{
              fontSize: '20px',
              color: '#08c',
              cursor: 'pointer',
              marginRight: 10,
            }}
            onClick={() => editUser(item)}
          />
          <DeleteOutlined
            style={{ fontSize: '20px', color: '#08c', cursor: 'pointer' }}
            onClick={() => deleteOrder(item.id)}
          />
          <ArrowDownOutlined
            style={{ fontSize: '20px', color: '#08c', cursor: 'pointer' }}
            onClick={() => downloadFile(item.fileUrl)}
          />
        </>
      ),
    },
  ];

  const showModal = () => {
    setIsShowModalAdd(!isShowModalAdd);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="wrapper-order-page">
        <h2>List Order</h2>
        <div className="order-content">
          <Button
            type="primary"
            onClick={showModal}
            size="small"
            className="btn-add-user"
          >
            Add Order
          </Button>
          {isShowModalAdd && (
            <AddOrder
              isShowModalAdd={isShowModalAdd}
              setIsShowModalAdd={setIsShowModalAdd}
            />
          )}
          <Table
            columns={columns}
            dataSource={listOrder}
            scroll={{ y: 400 }}
            className="table-order"
          />
          {isShowModalEdit && (
            <EditOrder
              isShowModalEdit={isShowModalEdit}
              id={idEdit}
              setIsShowModalEdit={setIsShowModalEdit}
            />
          )}

          <DeleteOrder
            isShowModalDelete={isShowModalDelete}
            setIsShowModalDelete={setIsShowModalDelete}
            id={idDelete}
          />
        </div>
      </div>
    </>
  );
}

export default memo(User);
