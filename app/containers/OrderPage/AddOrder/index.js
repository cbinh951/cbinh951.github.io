/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select, InputNumber } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { caculateTotalMoney } from 'helpers/money';

import LoadingIndicator from 'components/LoadingIndicator';

import { addOrderRequest, getOrderAttributeRequest } from '../actions';
import { selectOrderAttributeLoading, selectListAttribute } from '../selectors';

import './styles.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function AddOrder({ isShowModalAdd, setIsShowModalAdd }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [numberPage, setNumberPage] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [fileUrl, setFileUrl] = useState();

  const [selectedEmail, setSelectedEmail] = useState();
  const [optionEmail, setOptionEmail] = useState([]);

  // const [listAttrForm, setListAttrForm] = useState({
  //   id: 'clb4g5MtR8VMpX8XNOgV-CduYfanrKhL2SkiyonDO-wMHcScmb930PVp0HbdM8',
  //   shipping: 0,
  //   copies: 0,
  // });

  const [listAttrForm, setListAttrForm] = useState({});

  const dispatch = useDispatch();
  const onAddOrder = params => dispatch(addOrderRequest(params));
  const onGetOrderAttribute = () => dispatch(getOrderAttributeRequest());

  const listAttribute = useSelector(selectListAttribute());
  const loading = useSelector(selectOrderAttributeLoading());

  useEffect(() => {
    if (isShowModalAdd) {
      onGetOrderAttribute();
    }
  }, [isShowModalAdd]);

  const handleOk = () => {
    setIsShowModalAdd(false);
  };

  const handleCancel = () => {
    setIsShowModalAdd(false);
  };

  const createOrder = values => {
    values.fileUrl = fileUrl;
    values.userId = selectedEmail;
    values.numberOfPage = numberPage;
    delete values.email;
    delete values.money;
    delete values.upload;
    onAddOrder(values);
    setIsShowModalAdd(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
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
    // if (
    //   name === 'shipping' ||
    //   name === 'paperSizeId' ||
    //   name === 'paperTypeId' ||
    //   name === 'inkTypeId' ||
    //   name === 'copies' ||
    //   name === 'numpage' ||
    //   name === 'upload'
    // ) {
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
      // const money =
      //   costAttr * numberPage * parseInt(listAttrForm.copies, 10) +
      //   parseInt(listAttrForm.shipping, 10);
      const money = caculateTotalMoney(
        costAttr,
        numberPage,
        parseInt(listAttrForm.copies, 10),
        parseInt(listAttrForm.shipping, 10),
      );
      setTotalMoney(money);
    }
  };

  const handleSearch = value => {
    console.log('value', value);
    if (value) {
      fetch(
        `https://be.origami-model-management.apps.projectlumina.com/api/v1/admin/user?q=${value}`,
      )
        .then(response => response.json())
        .then(result => {
          setOptionEmail(result.users);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      setOptionEmail([]);
    }
  };

  const handleChange = value => {
    setSelectedEmail(value);
  };

  const options = optionEmail.map(d => <Option key={d.id}>{d.email}</Option>);

  return (
    <>
      <Modal
        title="Add Order"
        // visible={isModalVisible}
        visible={isShowModalAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button form="formOrder" key="submit" htmlType="submit">
            Create
          </Button>,
        ]}
      >
        {loading || Object.values(listAttribute).length === 0 ? (
          // {false ? (
          <LoadingIndicator />
        ) : (
          <Form
            id="formOrder"
            {...layout}
            name="adminOrder"
            onFinish={createOrder}
            onFinishFailed={onFinishFailed}
            onFieldsChange={formChange}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input email!' }]}
            >
              {/* <Input /> */}
              <Select
                showSearch
                value={selectedEmail}
                placeholder={'search email'}
                // style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
              >
                {options}
              </Select>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input address!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input phone!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Shipping"
              name="shipping"
              rules={[{ required: true, message: 'Please input shipping!' }]}
              initialValue={0}
            >
              <Input />
              {/* <InputNumber
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: 200 }}
                defaultValue={0}
              /> */}
              {/* <label>VND</label> */}
            </Form.Item>
            <Form.Item
              label="Ink type"
              name="inkTypeId"
              initialValue={listAttribute.inkType[0].id}
            >
              <Select
                placeholder="Select a page type"
                defaultValue={listAttribute.inkType[0].id}
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
              initialValue={listAttribute.paperType[0].id}
            >
              <Select
                placeholder="Select a page type"
                defaultValue={listAttribute.paperType[0].id}
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
              initialValue={listAttribute.paperSize[0].id}
            >
              <Select
                placeholder="Select a page size"
                defaultValue={listAttribute.paperSize[0].id}
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
                {isFilePicked ? (
                  <div>
                    <p>Filename: {selectedFile.name}</p>
                  </div>
                ) : (
                  <p>Select a file to show details</p>
                )}
              </div>
            </Form.Item>
            <Form.Item
              label="Number page"
              name="numberOfPage"
              initialValue={numberPage}
            >
              <span>{numberPage}</span>
            </Form.Item>
            <Form.Item
              label="Copies"
              name="copies"
              rules={[{ required: true, message: 'Please input copies!' }]}
              initialValue={1}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Money" name="money" initialValue={1}>
              {/* <Input /> */}
              {/* <span>{totalMoney}</span> */}
              <span>{new Intl.NumberFormat().format(totalMoney)} VND</span>
            </Form.Item>
            <Form.Item label="Note" name="note">
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

export default AddOrder;
