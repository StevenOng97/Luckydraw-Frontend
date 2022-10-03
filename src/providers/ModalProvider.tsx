import React, { FC, useState } from 'react';
import Modal from '../components/Modals/Modal';
import { ModalContext } from '../context/ModalContext';

const ModalProvider: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setOpen(true);
    setModalContent(content);
  };

  const hideModal = () => {
    setOpen(false);
    setTimeout(() => {
      setModalContent(null);
    }, 300);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        modalContent,
        hideModal,
      }}
    >
      {children}
      <Modal
        isOpen={isOpen}
        modalContent={modalContent}
        hideModal={hideModal}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
