import { useContext, createContext } from 'react';

export type ModalContextType = {
  hideModal?: () => void;
  showModal?: (content: any) => void;
  modalContent?: any;
};

export const ModalContext = createContext<ModalContextType>({});

export const useModal = () => useContext(ModalContext);
