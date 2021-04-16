/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';
import { caculateTotalMoney } from 'helpers/money';

import { getOrderByIdRequest, editOrderRequest } from '../actions';
import {
  selectEditOrderLoading,
  selectOrderById,
  selectListAttribute,
  selectOrderAttributeLoading,
} from '../selectors';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function EditOrder({ isShowModalEdit, id, setIsShowModalEdit }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [numberPage, setNumberPage] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [fileUrl, setFileUrl] = useState();
  const [listAttrForm, setListAttrForm] = useState({});

  const dispatch = useDispatch();
  const onEditOrder = idOrder => dispatch(getOrderByIdRequest(idOrder));
  const updateOrder = order => dispatch(editOrderRequest(order));

  const loading = useSelector(selectEditOrderLoading());
  const loadingAttr = useSelector(selectOrderAttributeLoading());

  const infoOrder = useSelector(selectOrderById());
  const listAttribute = useSelector(selectListAttribute());

  useEffect(() => {
    if (Object.keys(infoOrder).length > 0) {
      console.log('infoOrder', infoOrder);
      const money = caculateTotalMoney(
        parseInt(infoOrder.product.price, 10),
        infoOrder.numberOfPage,
        infoOrder.copies,
        parseInt(infoOrder.shipping, 10),
      );
      console.log('money', money);
      setNumberPage(infoOrder.numberOfPage);
      setTotalMoney(money);
    }
  }, [infoOrder]);

  useEffect(() => {
    if (isShowModalEdit) {
      onEditOrder(id);
    }
  }, [id, isShowModalEdit]);

  useEffect(() => {
    caculateMoney();
  }, [numberPage]);

  const handleUpdateOrder = values => {
    if (fileUrl) {
      values.fileUrl = fileUrl;
    }
    values.numberOfPage = numberPage;
    delete values.email;
    delete values.money;
    delete values.upload;
    updateOrder({ values, id });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setIsShowModalEdit(false);
  };

  const handleUpload = event => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);

    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('filename', event.target.value);

    fetch(
      'https://be.origami-model-management.apps.projectlumina.com/api/v1/order/file',
      {
        method: 'POST',
        body: data,
      },
    )
      .then(response => response.json())
      .then(result => {
        setNumberPage(result.numPage);
        setFileUrl(result.url);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    caculateMoney();
  }, [numberPage]);

  const formChange = (formName, info) => {
    const name = formName[0].name[0];
    let shipping = 0;
    let copies = 0;
    const listNameInput = [
      'shipping',
      'paperSizeId',
      'paperTypeId',
      'inkTypeId',
      'copies',
      'numpage',
      'upload',
    ];

    if (listNameInput.includes(name)) {
      let id = '';
      const money = info.map(item => {
        if (
          item.name[0] === 'paperSizeId' ||
          item.name[0] === 'paperTypeId' ||
          item.name[0] === 'inkTypeId'
        ) {
          id += item.value + '-';
        }
        if (item.name[0] === 'shipping') {
          shipping = item.value;
        }
        if (item.name[0] === 'copies') {
          copies = item.value;
        }
      });

      id = id.substring(0, id.length - 1);
      setListAttrForm({
        id,
        shipping,
        copies,
      });
      caculateMoney();
    }
  };

  const caculateMoney = () => {
    if (Object.values(listAttribute).length > 0) {
      const costAttr = listAttribute.cost[listAttrForm.id];
      console.log('listAttrForm', listAttrForm);
      console.log('numberPage', numberPage);
      const money = caculateTotalMoney(
        costAttr,
        numberPage,
        parseInt(listAttrForm.copies, 10),
        parseInt(listAttrForm.shipping, 10),
      );
      setTotalMoney(money);
    }
  };

  return (
    <>
      <Modal
        title="Edit Order"
        visible={isShowModalEdit}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button form="formEditOrder" key="submit" htmlType="submit">
            Save
          </Button>,
        ]}
      >
        {loading || loadingAttr || Object.keys(infoOrder).length === 0 ? (
          <LoadingIndicator />
        ) : (
          <Form
            id="formEditOrder"
            {...layout}
            onFinish={handleUpdateOrder}
            onFinishFailed={onFinishFailed}
            onFieldsChange={formChange}
          >
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input address!' }]}
              initialValue={infoOrder.address}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input phone!' }]}
              initialValue={infoOrder.phone}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Shipping"
              name="shipping"
              rules={[{ required: true, message: 'Please input shipping!' }]}
              initialValue={infoOrder.shipping}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Ink type"
              name="inkTypeId"
              initialValue={infoOrder.product.inkType.id}
            >
              <Select
                placeholder="Select a page type"
                // defaultValue={infoOrder.product.inkType.id}
                // onChange={onGenderChange}
              >
                {listAttribute.inkType.map(item => (
                  <Option value={item.id}>{item.value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Page type"
              name="paperTypeId"
              initialValue={infoOrder.product.paperType.id}
            >
              <Select
                placeholder="Select a page type"
                // defaultValue={listAttribute.paperType[0].id}
                // onChange={onGenderChange}
              >
                {listAttribute.paperType.map(item => (
                  <Option value={item.id}>{item.value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Page size"
              name="paperSizeId"
              initialValue={infoOrder.product.paperSize.id}
            >
              <Select
                placeholder="Select a page size"
                // defaultValue={listAttribute.paperSize[0].id}
                // onChange={onGenderChange}
              >
                {listAttribute.paperSize.map(item => (
                  <Option value={item.id}>{item.value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Upload" name="upload">
              <div>
                <input type="file" name="file" onChange={handleUpload} />
                {infoOrder.fileUrl ? (
                  <div>
                    <p>
                      Filename:{' '}
                      {isFilePicked ? selectedFile.name : infoOrder.fileUrl}
                    </p>
                  </div>
                ) : (
                  <p>Select a file to show details</p>
                )}
              </div>
            </Form.Item>
            <Form.Item
              label="Number page"
              name="numberOfPage"
              initialValue={infoOrder.numberOfPage}
            >
              <span>{isFilePicked ? numberPage : infoOrder.numberOfPage}</span>
            </Form.Item>
            <Form.Item
              label="Copies"
              name="copies"
              rules={[{ required: true, message: 'Please input copies!' }]}
              initialValue={infoOrder.copies}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Money" name="money" initialValue={1}>
              {/* <span>{totalMoney}</span> */}
              <span>{new Intl.NumberFormat().format(totalMoney)} VND</span>
            </Form.Item>
            <Form.Item
              label="Status"
              name="currentStatus"
              initialValue={infoOrder.currentStatus.id}
            >
              <Select disabled={infoOrder.currentStatus.id === 'NEW'}>
                {infoOrder.status.map(item => (
                  <Option value={item.id}>{item.value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Note" name="note" initialValue={infoOrder.note}>
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

EditOrder.propTypes = {
  isShowModalEdit: PropTypes.bool,
  setIsShowModalEdit: PropTypes.func,
  id: PropTypes.string,
  onGetListuser: PropTypes.func,
};

export default EditOrder;
