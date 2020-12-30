import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Badge, Button, Drawer } from "antd";
import { LoginOutlined, LogoutOutlined, BellOutlined, EditOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import LogoImg from "../../assets/images/ePlastLogotype.png";
import LogoText from "../../assets/images/logo_PLAST.svg";
import classes from "./Header.module.css";
import AuthorizeApi from '../../api/authorizeApi';
import jwt from 'jwt-decode';
import AuthStore from '../../stores/AuthStore';
import userApi from '../../api/UserApi';
import NotificationBox from '../NotificationBox/NotificationBox';
import NotificationBoxApi, { NotificationType, UserNotification } from '../../api/NotificationBoxApi';
import WebSocketConnection from '../NotificationBox/WebSocketConnection';
import HistoryDrawer from "./HistoryDrawer";
import { useLocation } from 'react-router-dom';

let authService = new AuthorizeApi();

const HeaderContainer = () => {
  const user = AuthorizeApi.isSignedIn();
  const [imageBase64, setImageBase64] = useState<string>();
  const [name, setName] = useState<string>();
  const [id, setId] = useState<string>("");
  const token = AuthStore.getToken() as string;
  const signedIn = AuthorizeApi.isSignedIn();
  const [userState, setUserState] = useState(signedIn);
  const [notificationTypes, setNotificationTypes] = useState<Array<NotificationType>>([]);
  const [notifications, setNotifications] = useState<Array<UserNotification>>([]);
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [visibleHistoryDrawer, setVisibleHistoryDrawer] = useState(false);
  const location = useLocation().pathname;

  const fetchData = async () => {
    if (user) {
      const user: any = jwt(token);
      await userApi.getById(user.nameid).then(async response => {
        setName(response.data.user.firstName);
        if (name !== undefined) {
          setUserState(true);
        }
        setId(response.data.user.id);

        if (response.data.user.id !== undefined) {
          getNotifications(response.data.user.id);
          getNotificationTypes();
          let connection = WebSocketConnection.ManageConnection(response.data.user.id);

          connection.onmessage = function (event) {
            const result = JSON.parse(decodeURIComponent(event.data));
            setNotifications(t => [result as UserNotification].concat(t))
          };
        }
        await userApi.getImage(response.data.user.imagePath).then((response: { data: any; }) => {
          setImageBase64(response.data);
        })
      })
    }
  };
  const userHistory: string[] = sessionStorage.getItem(`${name}`) !== null ? JSON.parse(sessionStorage[`${name}`]) : [];
  useEffect(() => {
    if (!userHistory.includes(location) && location !== "/signin") {
      userHistory.push(location)
    }
    if (userHistory.length > 25) {
      userHistory.shift();
    }
    sessionStorage.setItem(`${name}`, JSON.stringify(userHistory));
  }, [location])

  const getNotifications = async (userId: string) => {
    await NotificationBoxApi.getAllUserNotifications(userId)
      .then((response) => {
        setNotifications(response)
      })
      .catch(err => console.log(err))
  }

  const RemoveNotification = async (notificationId: number) => {
    await NotificationBoxApi.removeNotification(notificationId)
      .then(() => setNotifications(arr => arr.filter(elem => elem.id !== notificationId)));
  }

  const RemoveAllUserNotifications = async (userId: string) => {
    await NotificationBoxApi.removeUserNotifications(userId)
      .then(() => setNotifications([]));
  }

  const getNotificationTypes = async () => {
    await NotificationBoxApi.getAllNotificationTypes()
      .then((response) => {
        setNotificationTypes(response)
      })
      .catch(err => console.log(err))
  }

  const handleNotificationBox = async () => {
    if (id !== "") {
      getNotifications(id);
    }
  }

  const ShowNotifications = () => {
    setVisibleDrawer(true);
    NotificationBoxApi.SetCheckedAllUserNotification(id)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onLogoutClick = async () => {
    await authService.logout();
    setUserState(false);
  }

  const primaryMenu = (
    <Menu
      mode="vertical"
      className={`${classes.headerMenu} ${classes.dropDownMenu}`}
      theme="light"
    >
      <Menu.Item className={classes.headerDropDownItem} key="5">
        <NavLink
          to={`/userpage/edit/${id}`}
          className={classes.headerLink}
          activeClassName={classes.activeLink}
        >
          <EditOutlined className={classes.dropDownIcon} />
          Редагувати профіль
        </NavLink>
      </Menu.Item>
      <Menu.Item className={classes.headerDropDownItem} key="7">
        <NavLink
          to="/changePassword"
          className={classes.headerLink}
          activeClassName={classes.activeLink}
        >
          <EditOutlined className={classes.dropDownIcon} />
          Змінити пароль
        </NavLink>
      </Menu.Item>
      <Menu.Item className={classes.headerDropDownItem} key="6" >
        <NavLink
          className={classes.headerLink}
          activeClassName={classes.activeLink}
          to="/signin"
          onClick={onLogoutClick}
        >
          <LogoutOutlined className={classes.dropDownIcon} />
          Вийти
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout.Header className={classes.headerContainer}>
      <Menu mode="horizontal" className={classes.headerMenu} theme="light">
        <Menu.Item className={classes.headerItem} key="1">
          <div className={classes.headerLogo}>
            <NavLink to="/">
              <img src={LogoImg} alt="Logo" />
              <img src={LogoText} alt="Logo" />
            </NavLink>
          </div>
        </Menu.Item>
      </Menu>
      {signedIn && userState ? (
        <>
          <Menu mode="horizontal" className={classes.headerMenu + " " + classes.MenuWidth}>
            <Menu.Item
              className={classes.headerItem}
              key="4"
            >
              <Badge count={notifications.filter(n => n.checked === false).length}>
                <Button ghost
                  icon={<BellOutlined style={{ fontSize: "26px" }} />}
                  onClick={ShowNotifications}
                >
                </Button>
              </Badge>
            </Menu.Item>
            <Menu.Item
              className={classes.headerItem}
              key="5"
            >
              <Dropdown overlay={primaryMenu}>
                <NavLink
                  to={`/userpage/main/${id}`}
                  className={classes.userMenu}
                  activeClassName={classes.activeLink}
                >
                  <Avatar
                    size={36}
                    src={imageBase64}
                    alt="User"
                    style={{ marginRight: "10px" }}
                  />
                  Привіт, {name !== undefined ? (name?.length > 12 ? name.slice(0, 10) + "..." : name) : ""}
                </NavLink>
              </Dropdown>
            </Menu.Item>
            <Button type="ghost"
              className="historyInfoButton"
              onClick={() => setVisibleHistoryDrawer(true)}
            >↔</Button>
          </Menu>
          {id !== "" &&
            <NotificationBox
              userId={id}
              Notifications={notifications}
              VisibleDrawer={visibleDrawer}
              setVisibleDrawer={setVisibleDrawer}
              RemoveNotification={RemoveNotification}
              RemoveAllNotifications={RemoveAllUserNotifications}
              handleNotificationBox={handleNotificationBox}
            />
          }
          <HistoryDrawer
            history={userHistory}
            setVisibleHistoryDrawer={setVisibleHistoryDrawer}
            visibleHistoryDrawer={visibleHistoryDrawer}
          ></HistoryDrawer>
        </>
      ) : (
          <Menu mode="horizontal" className={classes.headerMenu} theme="light">
            <Menu.Item className={classes.headerItem} key="2">
              <NavLink
                to="/contacts"
                className={classes.headerLink}
                activeClassName={classes.activeLink}
              >
                Контакти
            </NavLink>
            </Menu.Item>
            <Menu.Item className={classes.headerItem} key="3">
              <NavLink
                to="/signin"
                className={classes.headerLink}
                activeClassName={classes.activeLink}
              >
                Увійти
              <LoginOutlined className={classes.headerIcon} />
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
    </Layout.Header>
  );
};
export default HeaderContainer;
