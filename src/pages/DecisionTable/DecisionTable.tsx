import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Layout,Pagination } from 'antd';
import columns from './columns';
import DropDown from './DropDownDecision';
import AddDecisionModal from './AddDecisionModal';
import decisionsApi, { Decision, statusTypeGetParser } from '../../api/decisionsApi';
import notificationLogic from '../../components/Notifications/Notification';
import ClickAwayListener from 'react-click-away-listener';
import moment from "moment";
import Spinner from '../Spinner/Spinner';
import AuthStore from '../../stores/AuthStore';
import jwt_decode from "jwt-decode";
const classes = require('./Table.module.css');

const { Content } = Layout;

const DecisionTable = () => {
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recordObj, setRecordObj] = useState<any>(0);
  const [data, setData] = useState<Decision[]>(Array<Decision>());
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [searchedData, setSearchedData] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [userRole, setUser] = useState<string[]>();
  const [canEdit, setCanEdit] = useState(false);
  const [regionAdm, setRegionAdm] = useState(false);
  const [cityAdm, setCityAdm] = useState(false);
  const [clubAdm, setClubAdm] = useState(false);
  const handleDelete = (id: number) => {
    const filteredData = data.filter(d => d.id !== id);
    setData([...filteredData]);
  }
  const handleEdit = (id: number, name: string, description: string) => {
    /* eslint no-param-reassign: "error" */
    const filteredData = data.filter(d => {
      if (d.id === id) {
        d.name = name;
        d.description = description;
      }
      return d;
    }
    );
    setData([...filteredData]);
  }
  const handleAdd = async () => {
    const lastId = data[data.length - 1].id;
    await decisionsApi.getById(lastId+1).then(res =>{
      const dec : Decision = {
        id :res.id,
        name: res.name,
        organization : res.organization.organizationName,
        decisionStatusType:statusTypeGetParser(res.decisionStatusType),
        decisionTarget: res.decisionTarget.targetName,
        description : res.description,
        fileName: res.fileName,
        date:res.date };
        setData([...data, dec]); 
   })
   .catch(() =>{
    notificationLogic('error', "Рішення не існує");
   });
  }

  useEffect(() => {
        const fetchData = async () => {
        let jwt = AuthStore.getToken() as string;
        let decodedJwt = jwt_decode(jwt) as any;
        let roles = decodedJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string[];
        setLoading(true);
        const res: Decision[] = await decisionsApi.getAll();
        setData(res);
        setLoading(false);
        setUser(roles);
        setCanEdit(roles.includes("Admin"));
        setRegionAdm(roles.includes("Голова Округу"));
        setCityAdm(roles.includes("Голова Станиці"));
        setClubAdm(roles.includes("Голова Куреня"));
    };
    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedData(event.target.value.toLowerCase());
  };


  const filteredData = searchedData
    ? data.filter((item) => {
      return Object.values([
        item.name,
        item.organization,
        item.id,
        item.description,
        item.decisionStatusType,
        item.decisionTarget,
        moment(item.date.toLocaleString()).format("DD.MM.YYYY"),
      ]).find((element) => {
        return String(element).toLowerCase().includes(searchedData);
      });
    })
    : data;

    
   const  handleClickAway=()=>{
    setShowDropdown(false);
   }


  const showModal = () => setVisibleModal(true);

  return !loading ? (
    <Layout>
      <Content>
        <h1 className={classes.titleTable}>Рішення керівних органів</h1>
          <>
            <div className={classes.searchContainer}>
            {(canEdit == true || regionAdm == true || cityAdm == true || clubAdm == true) ? (
              <Button type="primary" onClick={showModal}>
                Додати рішення
              </Button>
               ) : (<> </>)
              }
              <Input placeholder="Пошук" onChange={handleSearch} allowClear />
            </div>
            <Table
              className={classes.table}
              dataSource={filteredData}
              scroll={{ x: 1300 }}
              columns={columns}
              bordered
              rowKey="id"


              onRow={(record) => {
                return {
                  onClick: () => {
                    setShowDropdown(false);
                  },
                  onContextMenu: (event) => {
                    event.preventDefault();
                    setShowDropdown(true);
                    setRecordObj(record.id);
                    setX(event.pageX);
                    setY(event.pageY);
                  },
                };
              }}
              onChange={(pagination) => {
                if (pagination) {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth',
                  });
                }
              }}
              pagination={
                {
                  showLessItems: true,
                  responsive:true,
                  showSizeChanger: true,
                }
              }
            />
            <ClickAwayListener onClickAway={handleClickAway}>
            <DropDown
              showDropdown={showDropdown}
              record={recordObj}
              pageX={x}
              pageY={y}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            </ClickAwayListener>
            <AddDecisionModal
              setVisibleModal={setVisibleModal}
              visibleModal={visibleModal}
              onAdd={handleAdd}
            />
          </>
      </Content>
    </Layout>
  ) : (
    <Spinner />
  );
};

export default DecisionTable;
