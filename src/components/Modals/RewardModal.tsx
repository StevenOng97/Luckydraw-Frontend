import React, { FC } from 'react';
import Modal from './Modal';

interface RewardModalProps {
  setOpenModal: (status: boolean) => void;
  isOpenModal: boolean;
  winner?: any;
  user?: any;
}

const RewardModal: FC<RewardModalProps> = ({
  setOpenModal,
  isOpenModal,
  winner,
  user,
}) => {
  const renderRewardModal = () => {
    return (
      <div>
        <div className="flex justify-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 fill-green-500"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="my-5">
          Chúc mừng email: {user?.email} với số điện thoại: {user?.phone} đã
          trúng 1 <span className="font-bold">{winner?.option}</span>
        </p>
        <div className="mt-3 flex justify-around">
          <button
            type="button"
            className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            onClick={() => setOpenModal(false)}
          >
            Đóng
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            onClick={() => setOpenModal(false)}
          >
            Đổi thưởng
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal setModalState={setOpenModal} isOpen={isOpenModal}>
      {renderRewardModal()}
    </Modal>
  );
};

export default RewardModal;
