import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../ForgotPassword/ForgotPassword.module.css';
import { checkEmail} from '../SignUp/verification';
import AuthorizeApi from '../../api/authorizeApi';
import { useHistory } from 'react-router-dom';
let authService = new AuthorizeApi();

export default function () {
    const [form] = Form.useForm();
    const history = useHistory();

    const validationSchema = {
        Email: [
            { required: true, message: "Поле електронна пошта є обов'язковим" },
            { validator: checkEmail }
        ]
    };

    const handleSubmit = async (values: any) => {
        await authService.forgotPassword(values);
        history.push("/forgotPassword");
      };

    const initialValues = {
        Email: ''
      };

    return (
        <div className={styles.mainContainerForgot}>
            <Form
                name="ForgotPasswordForm"
                initialValues={initialValues}
                form={form}
                onFinish={handleSubmit}>
            <div className={styles.forgotPasswordContainer}>
                <p>Забули пароль?  Введіть електронну пошту</p>
            </div>
            <Form.Item name="Email" rules={validationSchema.Email}>
                <Input
                    className={styles.ForgotPasswordInput}
                    placeholder="Електронна пошта"
                />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" id={styles.confirmButton}>
                    Надіслати
                </Button>
            </Form.Item>
          </Form>
        </div>
      );
}