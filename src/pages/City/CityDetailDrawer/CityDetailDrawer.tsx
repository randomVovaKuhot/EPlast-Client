import React from "react";
import { Drawer, Button, Col, Row, Form, Input } from "antd";
import "./CityDetailDrawer.less";
import CityProfile from "./../../../models/City/CityProfile";
import TextArea from "antd/lib/input/TextArea";

interface Props {
  visibleDrawer: boolean;
  setVisibleDrawer: (visibleDrawer: boolean) => void;
  city: CityProfile;
}

const CityDetailDrawer = (props: Props) => {
  return (
    <Drawer
      title={`Деталі станиці ${props.city.name?.length > 0 ? props.city.name : ""}`}
      onClose={() => props.setVisibleDrawer(false)}
      visible={props.visibleDrawer}
      footer={null}
      forceRender={true}
      width=""
      className="cityDetail"
    >
      <Form className="detailsForm">
        <Row justify="center" gutter={[12, 0]}>
          <Col md={12} xs={24}>
            <Form.Item
              name="cityURL"
              label="Посилання"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.cityURL?.length > 0 ? props.city.cityURL : "---"
              }
            >
              <a href={props.city.cityURL} target="_blank">
                <Input
                  value={
                    props.city.cityURL?.length > 0 ? props.city.cityURL : "---"
                  }
                  disabled
                />
              </a>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="phoneNumber"
              label="Номер телефону"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.phoneNumber?.length > 0
                  ? props.city.phoneNumber
                  : "---"
              }
            >
              <Input
                value={
                  props.city.phoneNumber?.length > 0
                    ? props.city.phoneNumber
                    : "---"
                }
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" gutter={[12, 0]}>
          <Col md={12} xs={24}>
            <Form.Item
              name="email"
              label="Електронна пошта"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.email?.length > 0 ? props.city.email : "---"
              }
            >
              <Input
                value={props.city.email?.length > 0 ? props.city.email : "---"}
                disabled
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="region"
              label="Округ"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.region?.length > 0 ? props.city.region : "---"
              }
            >
              <Input
                value={
                  props.city.region?.length > 0 ? props.city.region : "---"
                }
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" gutter={[12, 0]}>
          <Col md={12} xs={24}>
            <Form.Item
              name="street"
              label="Вулиця"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.street?.length > 0 ? props.city.street : "---"
              }
            >
              <Input
                value={
                  props.city.street?.length > 0 ? props.city.street : "---"
                }
                disabled
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="houseNumber"
              label="Номер будинку"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.houseNumber?.length > 0
                  ? props.city.houseNumber
                  : "---"
              }
            >
              <Input
                value={
                  props.city.houseNumber?.length > 0
                    ? props.city.houseNumber
                    : "---"
                }
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" gutter={[12, 0]}>
          <Col md={12} xs={24}>
            <Form.Item
              name="officeNumber"
              label="Номер офісу/квартири"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.officeNumber?.length > 0
                  ? props.city.officeNumber
                  : "---"
              }
            >
              <Input
                value={
                  props.city.officeNumber?.length > 0
                    ? props.city.officeNumber
                    : "---"
                }
                disabled
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="postIndex"
              label="Поштовий індекс"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.postIndex?.length > 0 ? props.city.postIndex : "---"
              }
            >
              <Input
                value={
                  props.city.postIndex?.length > 0
                    ? props.city.postIndex
                    : "---"
                }
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" gutter={[12, 0]}>
          <Col md={24} xs={24}>
            <Form.Item
              name="description"
              label="Опис"
              labelCol={{ span: 24 }}
              initialValue={
                props.city.description?.length > 0
                  ? props.city.description
                  : "---"
              }
            >
              <TextArea
                autoSize =
                {
                  {
                    minRows: 1,
                    maxRows: 9
                  }
                }
                value={
                  props.city.description?.length > 0
                    ? props.city.description
                    : "---"
                }
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CityDetailDrawer;
