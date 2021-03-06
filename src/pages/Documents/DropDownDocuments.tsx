import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import AuthStore from '../../stores/AuthStore';
import jwt_decode from "jwt-decode";
import classes from './Table.module.css';
import deleteConfirm from './DeleteConfirm';
import documentsApi from '../../api/documentsApi';
import { destroyFns } from 'antd/lib/modal/Modal';
import { DocumentPost } from '../../models/Documents/DocumentPost';
interface Props {
  record: number;
  pageX: number;
  pageY: number;
  showDropdown: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, description: string) => void;
}

const DropDown = (props: Props) => {
  const { record, pageX, pageY, showDropdown, onDelete, onEdit } = props;
  const [showEditModal, setShowEditModal] = useState(false);
  const [regionAdm, setRegionAdm] = useState(false);
  const [cityAdm, setCityAdm] = useState(false);
  const [clubAdm, setClubAdm] = useState(false);
  const [data, setData] = useState<DocumentPost>({
    id: 0,
    name: "",
    organization: { organizationName: "", id: 0 },
    type: 0,
    description: "",
    date: "",
    fileName: null,
  });

  useEffect(() => {
    if (showEditModal) {
      const fetchData = async () => {
        await documentsApi.getById(record).then(res => setData(res));
        let jwt = AuthStore.getToken() as string;
        let decodedJwt = jwt_decode(jwt) as any;
        let roles = decodedJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string[];
        setRegionAdm(roles.includes("Голова Округу"));
        setCityAdm(roles.includes("Голова Станиці"));
        setClubAdm(roles.includes("Голова Куреня"));
      }
      fetchData();
    }
  }, [showEditModal]);
  /* eslint no-param-reassign: "error" */
  const handleItemClick = async (item: any) => {
    deleteConfirm(record, onDelete);
    item.key = '0'
  };

  return (
    <>
      <Menu
        theme="dark"
        onClick={handleItemClick}
        className={classes.menu}
        style={{
          top: pageY,
          left: (window.innerWidth - (pageX + 184)) < 0 ? window.innerWidth - 227 : pageX,
          display: showDropdown ? 'block' : 'none',
        }}
      >
        {
          <Menu.Item key="1">
            <DeleteOutlined />
          Видалити
          </Menu.Item>
        }
      </Menu>
    </>
  );
};

export default DropDown;
