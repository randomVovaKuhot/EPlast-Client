import React, { useState } from 'react';
import { Menu } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import classes from './Table.module.css';
import EditUserModal from './EditUserModal';
import deleteConfirm from './DeleteUserRecord';

const DropDown = (props) => {
  // eslint-disable-next-line react/prop-types
  const { record, pageX, pageY, showDropdown } = props;
  const [showEditModal, setShowEditModal] = useState(false);

  const handleItemClick = (item) => {
    switch (item.key) {
      case '1':
        setShowEditModal(true);
        break;
      case '2':
        deleteConfirm();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Menu
        theme="dark"
        onClick={handleItemClick}
        className={classes.menu}
        style={{
          top: pageY,
          left: pageX,
          display: showDropdown ? 'block' : 'none',
        }}
      >
        <Menu.Item key="1">
          <EditOutlined />
          Редагувати
        </Menu.Item>
        <Menu.Item key="2">
          <DeleteOutlined />
          Видалити
        </Menu.Item>
      </Menu>
      <EditUserModal
        record={record}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
    </>
  );
};

export default DropDown;
