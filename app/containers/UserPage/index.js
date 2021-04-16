import React, { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Switch } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';

import { getListUserRequest } from './actions';
import { selectListUser, selectPageLoading } from './selectors';

import AddUser from './AddUser';

import reducer from './reducer';
import saga from './saga';

import './styles.scss';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

const key = 'userPage';

function User() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [idDelete, setIdDelete] = useState();

  const loading = useSelector(selectPageLoading());
  const listUser = useSelector(selectListUser());

  const dispatch = useDispatch();
  const onGetListuser = () => dispatch(getListUserRequest());

  useEffect(() => {
    onGetListuser();
  }, []);

  const editUser = item => {
    setIdEdit(item.id);
    setIsShowModalEdit(true);
  };

  const deleteUser = id => {
    setIdDelete(id);
    setIsShowModalDelete(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: status => (
        <>
          <Switch defaultChecked={status} />
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
            onClick={() => deleteUser(item.id)}
          />
        </>
      ),
    },
  ];

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="wrapper-user-page">
        <h2>List User</h2>
        <div className="user-content">
          <AddUser />
          <Table
            columns={columns}
            dataSource={listUser}
            scroll={{ y: 500 }}
            className="table-users"
          />
          <EditUser
            isShowModalEdit={isShowModalEdit}
            id={idEdit}
            setIsShowModalEdit={setIsShowModalEdit}
            onGetListuser={onGetListuser}
          />
          <DeleteUser
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
