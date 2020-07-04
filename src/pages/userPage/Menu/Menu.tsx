import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./Menu.module.css";

export default function ({ url }: any) {
  const history = useHistory();

  return (
    <div className={styles.wrapper}>
      <Menu
        mode="horizontal"
        className={styles.menu}
        defaultSelectedKeys={[url]}
      >
        <Menu.Item key="main" onClick={() => history.push("/userpage/main")}>
          Персональні дані
        </Menu.Item>
        <Menu.Item key="2">Дійсне членство</Menu.Item>
        <Menu.Item key="3">Діловодства</Menu.Item>
        <Menu.Item
          key="edit-event"
          onClick={() => history.push("/userpage/edit-event")}
        >
          Події
        </Menu.Item>
        <Menu.Item key="5">З`їзди</Menu.Item>
        <Menu.Item key="6">Бланки</Menu.Item>
        <Menu.Item
          key="assignments"
          onClick={() => history.push("/userpage/assignments")}
        >Поручення</Menu.Item>
        <Menu.Item key="edit" onClick={() => history.push("/userpage/edit")}>
          Редагувати профіль
        </Menu.Item>
      </Menu>
    </div>
  );
}
