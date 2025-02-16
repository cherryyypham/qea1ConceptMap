import React from 'react';
import { Modal } from 'antd';
import StudentOutcomeResults from './StudentOutcomeResults';

const NodeInfoModal = ({ isModalOpen, closeModal, modalContent }) => {
  return (
    <Modal
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
    >
      {modalContent}
    </Modal>
  );
};

export default NodeInfoModal;
