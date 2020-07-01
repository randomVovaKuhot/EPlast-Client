import React from 'react';
import { Modal, Button } from 'antd';
import FormAddDecision from './FormAddDecision';

// eslint-disable-next-line react/prop-types
const AddDecisionModal = ({ visibleModal, setVisibleModal }) => {
  const handleOk = () => {};

  const handleCancel = () => setVisibleModal(false);

  return (
    <Modal
      title="Додати рішення пластового проводу"
      visible={visibleModal}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Відміна
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Опублікувати
        </Button>,
      ]}
    >
      <FormAddDecision />
    </Modal>
  );
};

export default AddDecisionModal;
