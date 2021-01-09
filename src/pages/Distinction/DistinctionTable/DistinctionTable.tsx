import React, { useEffect, useState } from "react";
import { Table, Input, Button, Layout } from "antd";
import columns from "./columns";
import notificationLogic from "../../../components/Notifications/Notification";
import UserDistinction from "../Interfaces/UserDistinction";
import DropDownDistinctionTable from "./DropDownDistinctionTable";
import distinctionApi from "../../../api/distinctionApi";
import AddDistinctionModal from "../DistinctionTable/AddDistinctionModal";
import EditDistinctionTypesModal from "./EditDistinctionTypesModal";
import ClickAwayListener from "react-click-away-listener";
import User from "../../../models/UserTable/User";
import Distinction from "../Interfaces/Distinction";
import Spinner from "../../Spinner/Spinner";
import AuthStore from "../../../stores/AuthStore";
import jwt from "jwt-decode";
import moment from "moment";
import NotificationBoxApi from "../../../api/NotificationBoxApi";
import {
  successfulCreateAction,
  successfulDeleteAction,
  successfulUpdateAction
} from "../../../components/Notifications/Messages"
import { RollbackOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const { Content } = Layout;
const DistinctionTable = () => {
  const classes = require("./Table.module.css");
  let user: any;
  let curToken = AuthStore.getToken() as string;
  let roles: string[] = [""];
  user = curToken !== null ? (jwt(curToken) as string) : "";
  roles =
    curToken !== null
      ? (user[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] as string[])
      : [""];
  const [recordObj, setRecordObj] = useState<any>(0);
  const [userId, setUserId] = useState<any>(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalEditDist, setVisibleModalEditDist] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState("");
  const [canEdit] = useState(roles.includes("Admin"));
  const history = useHistory();
  const [UserDistinctions, setData] = useState<UserDistinction[]>([
    {
      id: 0,
      distinction: {
        id: 0,
        name: "",
      },
      distinctionId: 0,
      userId: "",
      reporter: "",
      reason: "",
      number: 0,
      date: new Date(),
      user: new User(),
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res: UserDistinction[] = await distinctionApi.getUserDistinctions();
      setData(res);
      setLoading(true);
    };
    fetchData();
  }, []);

  let filteredData = searchedData
    ? UserDistinctions.filter((item) => {
      return Object.values([
        item.reporter,
        item.reason,
        item.number,
        moment(item.date.toLocaleString()).format("DD.MM.YYYY"),
      ]).find((element) => {
        return String(element).toLowerCase().includes(searchedData);
      });
    })
    : UserDistinctions;

  filteredData = filteredData.concat(
    UserDistinctions.filter(
      (item) =>
        (item.user.firstName.toLowerCase()?.includes(searchedData) ||
          item.user.lastName.toLowerCase()?.includes(searchedData)) &&
        !filteredData.includes(item)
    )
  );
  filteredData = filteredData.concat(
    UserDistinctions.filter(
      (item) =>
        item.distinction.name.toLowerCase()?.includes(searchedData) &&
        !filteredData.includes(item)
    )
  );
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedData(event.target.value.toLowerCase());
    setLoading(true);
  };

  const showModal = () => {
    setVisibleModal(true);
  };

  const handleAdd = async () => {
    setVisibleModal(false);
    setLoading(false);
    const res: UserDistinction[] = await distinctionApi.getUserDistinctions();
    setData(res);
    notificationLogic("success", successfulCreateAction("Відзначення"));
    setLoading(true);
  };

  const showModalEditTypes = () => {
    setVisibleModalEditDist(true);
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };


  const CreateDeleteNotification = (id: number) => {
    const userDistinction = UserDistinctions.find(
      (d: { id: number }) => d.id === id
    );
    if (userDistinction) {
      NotificationBoxApi.createNotifications(
        [userDistinction.userId],
        `Ваше відзначення: '${userDistinction.distinction.name}' було видалено.`,
        NotificationBoxApi.NotificationTypes.UserNotifications
      );
      NotificationBoxApi.getCitiesForUserAdmins(userDistinction.userId)
        .then(res => {
          res.cityRegionAdmins.length !== 0 &&
            res.cityRegionAdmins.forEach(async (cra) => {
              await NotificationBoxApi.createNotifications(
                [cra.cityAdminId, cra.regionAdminId],
                `${res.user.firstName} ${res.user.lastName}, який є членом станиці: '${cra.cityName}' був позбавлений відзначення: '${userDistinction.distinction.name}'. `,
                NotificationBoxApi.NotificationTypes.UserNotifications
              );
            })
        });
    }
  }

  const CreateEditNotification = (userId: string, name: string) => {
    if (userId !== "" && name !== "") {
      NotificationBoxApi.createNotifications(
        [userId],
        `Ваше відзначення: '${name}' було змінено. `,
        NotificationBoxApi.NotificationTypes.UserNotifications,
        `/distinctions`,
        `Переглянути`
      );
      NotificationBoxApi.getCitiesForUserAdmins(userId)
        .then(res => {
          res.cityRegionAdmins.length !== 0 &&
            res.cityRegionAdmins.forEach(async (cra) => {
              await NotificationBoxApi.createNotifications(
                [cra.cityAdminId, cra.regionAdminId],
                `${res.user.firstName} ${res.user.lastName}, який є членом станиці: '${cra.cityName}' отримав змінене відзначення: '${name}'. `,
                NotificationBoxApi.NotificationTypes.UserNotifications,
                `/distinctions`,
                `Переглянути`
              );
            })
        });
    }
  }

  const handleDelete = (id: number) => {
    const filteredData = UserDistinctions.filter(
      (d: { id: number }) => d.id !== id
    );
    setData([...filteredData]);
    notificationLogic("success", successfulDeleteAction("Відзначення"));
    CreateDeleteNotification(id);
  };
  const handleEdit = (
    id: number,
    distinction: Distinction,
    date: Date,
    reason: string,
    reporter: string,
    number: number,
    user: any,
    userId: string
  ) => {
    /* eslint no-param-reassign: "error" */
    const filteredData = UserDistinctions.filter((d) => {
      if (d.id === id) {
        d.distinction = distinction;
        d.distinctionId = distinction.id;
        d.date = date;
        d.reason = reason;
        d.reporter = reporter;
        d.number = number;
        d.user = user;
        d.userId = userId;
      }
      return d;
    });
    setData([...filteredData]);
    notificationLogic("success", successfulUpdateAction("Відзначення"));
    CreateEditNotification(userId, distinction.name);
  };

  return loading === false ? (
    <Spinner />
  ) : (
      <Layout>
        <Content
          onClick={() => {
            setShowDropdown(false);
          }}
        >
          <h1 className={classes.titleTable}>Відзначення</h1>

          <>
            <div className={classes.searchContainer}>
              {canEdit === true ? (
                <>
                  <Button type="primary" onClick={showModal}>
                    Додати відзначення
                </Button>
                  <Button type="primary" onClick={showModalEditTypes}>
                    Редагування типів відзначень
                </Button>
                  <span />
                </>
              ) : (
                  <></>
                )}
              <Input placeholder="Пошук" onChange={handleSearch} allowClear />
            </div>
            <div>
              <Table
                className={classes.table}
                dataSource={filteredData}
                columns={columns}
                scroll={{ x: 1300 }}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setShowDropdown(false);
                    },
                    onContextMenu: (event) => {
                      event.preventDefault();
                      setShowDropdown(true);
                      setRecordObj(record.id);
                      setUserId(record.userId);
                      setX(event.pageX);
                      setY(event.pageY);
                    },
                  };
                }}
                pagination={{
                  showLessItems: true,
                  responsive: true,
                  showSizeChanger: true,
                }}
                bordered
                rowKey="id"
              />
            </div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <DropDownDistinctionTable
                showDropdown={showDropdown}
                record={recordObj}
                userId={userId}
                pageX={x}
                pageY={y}
                canEdit={canEdit}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </ClickAwayListener>

            <AddDistinctionModal
              setVisibleModal={setVisibleModal}
              visibleModal={visibleModal}
              onAdd={handleAdd}
            />
            <EditDistinctionTypesModal
              setVisibleModal={setVisibleModalEditDist}
              visibleModal={visibleModalEditDist}
            />
          </>
        </Content>
        <div className="cityMoreItems">
          <Button
            className="backButton"
            icon={<RollbackOutlined />}
            size={"large"}
            onClick={() => history.goBack()}
            type="primary"
          >
            Назад
        </Button>
        </div>

      </Layout>
    );
};
export default DistinctionTable;
