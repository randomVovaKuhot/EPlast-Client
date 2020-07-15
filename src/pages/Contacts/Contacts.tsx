import React from 'react';
import { Button, Form, Input, Layout, List } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, InfoOutlined } from '@ant-design/icons';
import ReactInputMask from "react-input-mask";
import classes from './Contacts.module.css';

const Contacts = () => {
  const data = [
    {
      avatar: <EnvironmentOutlined style={{ fontSize: '24px', marginRight: '20px' }} />,
      title: 'Україна',
    },
    {
      avatar: <PhoneOutlined style={{ fontSize: '24px', marginRight: '20px' }} />,
      title: '+38(099)-99-99-99-9',
    },
    {
      avatar: <MailOutlined style={{ fontSize: '24px', marginRight: '20px' }} />,
      title: 'info@plast.ua',
    },
  ];
  const validateMessages = {
    required: 'Це поле є обов`язковим!',
    types: {
      email: 'Невалідний email!',
    },
  };

  return (
    <Layout.Content className={classes.contacts}>
      <section className={classes.contactsList}>
        <h1>
          <InfoOutlined style={{ fontSize: '32px' }} />
          Контакти
        </h1>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta avatar={item.avatar} title={item.title} />
            </List.Item>
          )}
        />
      </section>
      <Form
        className={classes.contactsForm}
        layout="vertical"
        validateMessages={validateMessages}
      >
        <Form.Item name={['user', 'name']} label="Вкажіть Ваше ім'я" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Вкажіть Ваш email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="Вкажіть Ваш номер телефону">
          <ReactInputMask mask="+38(999)-999-99-99">
            {(inputProps:any) => <Input {...inputProps} type="tel"/>}
          </ReactInputMask>
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Опишіть Ваше звернення" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Відправити
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
};
export default Contacts;
