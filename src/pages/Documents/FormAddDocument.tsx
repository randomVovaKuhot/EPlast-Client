import React, { useEffect, useState } from "react";
import {
  Form,
  DatePicker,
  Select,
  Input,
  Upload,
  Button,
  Row,
  Col,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import documentsApi, {
  TypePostParser
} from "../../api/documentsApi";

import { getBase64 } from "../userPage/EditUserPage/Services";
import notificationLogic from "../../components/Notifications/Notification";
import formclasses from "../DecisionTable/FormAddDecision.module.css";
import {
  emptyInput,
  fileIsUpload,
  fileIsNotUpload,
  possibleFileExtensions,
  fileIsTooBig,
  maxLength,
  successfulDeleteAction,
} from "../../components/Notifications/Messages"
import { DocumentOnCreateData, DocumentWrapper, FileWrapper, MethodicDocumentType, Organization } from "../../models/Documents/DocumentModels";

type FormAddDocumentsProps = {
  setVisibleModal: (visibleModal: boolean) => void;
  onAdd: () => void;
};
const FormAddDocument: React.FC<FormAddDocumentsProps> = (props: any) => {
  const { setVisibleModal, onAdd } = props;
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileData, setFileData] = useState<FileWrapper>({
    FileAsBase64: null,
    FileName: null,
  });
  const [form] = Form.useForm();
  const normFile = (e: { fileList: any }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCancel = () => {
    form.resetFields();
    setFileData({ FileAsBase64: null, FileName: null });
    setVisibleModal(false);
  };

  const handleUpload = (info: any) => {
    if (info.file !== null) {
      if (info.file.size <= 3145728) {
        if (checkFile(info.file.name)) {
          getBase64(info.file, (base64: string) => {
            setFileData({
              FileAsBase64: base64.split(",")[1],
              FileName: info.file.name,
            });
          });
          notificationLogic("success", fileIsUpload());
        }
      } else {
        notificationLogic("error", fileIsTooBig(3));
      }
    } else {
      notificationLogic("error", fileIsNotUpload());
    }
  };
  const checkFile = (fileName: string): boolean => {
    const extension = fileName.split(".").reverse()[0];
    const isCorrectExtension =
      extension.indexOf("pdf") !== -1 ||
      extension.indexOf("jpg") !== -1 ||
      extension.indexOf("jpeg") !== -1 ||
      extension.indexOf("png") !== -1 ||
      extension.indexOf("docx") !== -1 ||
      extension.indexOf("doc") !== -1 ||
      extension.indexOf("txt") !== -1 ||
      extension.indexOf("csv") !== -1 ||
      extension.indexOf("xls") !== -1 ||
      extension.indexOf("xml") !== -1 ||
      extension.indexOf("odt") !== -1 ||
      extension.indexOf("ods") !== -1;
    if (!isCorrectExtension) {
      notificationLogic(
        "error",
        possibleFileExtensions("pdf, docx, doc, txt, csv, xls, xml, jpg, jpeg, png, odt, ods.")
      );
    }
    return isCorrectExtension;
  };

  const handleSubmit = async (values: any) => {
    setSubmitLoading(true);
    const newDocument: DocumentWrapper = {
      MethodicDocument: {
        id: 0,
        name: values.name,
        type: TypePostParser(
          JSON.parse(values.methodicDocumentType)
        ),
        organization: JSON.parse(values.organization),
        description: values.description,
        date:
          /* eslint no-underscore-dangle: ["error", { "allow": ["_d"] }] */ values
            .datepicker._d,
        fileName: fileData.FileName,
      },
      fileAsBase64: fileData.FileAsBase64,
    };
    await documentsApi.post(newDocument);
    setVisibleModal(false);
    onAdd();
    form.resetFields();
    setSubmitLoading(false);
  };

  const [data, setData] = useState<DocumentOnCreateData>({
    organizations: Array<Organization>(),
    methodicDocumentTypesItems: Array<MethodicDocumentType>(),
  });

  useEffect(() => {
    const fetchData = async () => {
      await documentsApi
        .getOnCreate()
        .then((d: DocumentOnCreateData) => setData(d));
    };
    fetchData();
  }, []);

  return (
    <Form name="basic" onFinish={handleSubmit} form={form}>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item
            className={formclasses.formField}
            label="Тип документу"
            labelCol={{ span: 24 }}
            name="methodicDocumentType"
            rules={[{ required: true, message: emptyInput() }]}
          >
            <Select className={formclasses.selectField}>
              {data?.methodicDocumentTypesItems.map((dst) => (
                <Select.Option key={dst.value} value={JSON.stringify(dst)}>
                  {dst.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item
            className={formclasses.formField}
            labelCol={{ span: 24 }}
            label="Назва документу"
            name="name"
            rules={[
              {
                required: true,
                message: emptyInput(),
              },
              {
                max: 60,
                message: maxLength(60)
              },
            ]}
          >
            <Input className={formclasses.inputField} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item
            className={formclasses.formField}
            label="Орган, що видав документ"
            labelCol={{ span: 24 }}
            name="organization"
            rules={[{ required: true, message: emptyInput() }]}
          >
            <Select
              placeholder="Оберіть орган"
              className={formclasses.selectField}
            >
              {data?.organizations.map((o) => (
                <Select.Option key={o.id} value={JSON.stringify(o)}>
                  {o.organizationName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item
            className={formclasses.formField}
            name="datepicker"
            label="Дата документу"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: emptyInput() }]}
          >
            <DatePicker
              format="DD.MM.YYYY"
              className={formclasses.selectField}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item
            className={formclasses.formField}
            label="Короткий зміст (опис) документу"
            labelCol={{ span: 24 }}
            name="description"
            rules={[{ required: true, message: emptyInput() }]}
          >
            <Input.TextArea allowClear className={formclasses.inputField} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item label="Прикріпити" labelCol={{ span: 24 }}>
            <Form.Item
              className={formclasses.formField}
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name="file"
                customRequest={handleUpload}
                className={formclasses.formField}
                multiple={false}
                showUploadList={false}
                accept=".doc,.docx,.png,.xls,xlsx,.png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                headers={{ authorization: "authorization-text" }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: "#3c5438" }} />
                </p>
                <p className="ant-upload-hint">
                  Клікніть або перетягніть файл для завантаження
                </p>

                {fileData.FileAsBase64 !== null && (
                  <div>
                    <div>{fileData.FileName}</div>{" "}
                  </div>
                )}
              </Upload.Dragger>

              {fileData.FileAsBase64 !== null && (
                <div>
                  <Button
                    className={formclasses.cardButton}
                    onClick={() => {
                      setFileData({ FileAsBase64: null, FileName: null });
                      notificationLogic("success", successfulDeleteAction("Файл"));
                    }}
                  >
                    {" "}
                    Видалити файл
                  </Button>{" "}
                </div>
              )}
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item style={{ textAlign: "right" }} className={formclasses.formField}>
            <Button
              key="back"
              onClick={handleCancel}
              className={formclasses.buttons}
            >
              Відмінити
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={formclasses.buttons}
              loading={submitLoading}
            >
              Опублікувати
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormAddDocument;
