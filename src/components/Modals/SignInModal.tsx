import React, { FC } from 'react';
import formData from '../../helpers/loginForm';
import Form from '../Form';
import FormInput from '../FormInput';
import Modal from './Modal';
import { UseFormReturn, Control, FieldErrorsImpl } from 'react-hook-form';

interface SignInModalProps {
  setOpenModal: (status: boolean) => void;
  onSubmit: () => void;
  isOpenModal: boolean;
  isLoading: boolean;
  register?: UseFormReturn['register'];
  errors?: FieldErrorsImpl;
  control?: Control;
}

const SignInModal: FC<SignInModalProps> = ({
  setOpenModal,
  isOpenModal,
  onSubmit,
  isLoading,
  register,
  errors,
  control,
}) => {
  const renderInformationForm = () => {
    return (
      <Form submit={onSubmit} loading={isLoading}>
        {formData.map((field, i) => {
          const { placeholder, type, rules, name, id } = field;
          return (
            <FormInput
              key={i}
              id={id}
              type={type}
              name={name}
              label={placeholder}
              className="mb-2 form-control"
              register={register}
              rules={rules}
              errors={errors}
              control={control}
            />
          );
        })}
      </Form>
    );
  };

  return (
    <Modal title="Đăng nhập" setModalState={setOpenModal} isOpen={isOpenModal}>
      {renderInformationForm()}
    </Modal>
  );
};

export default SignInModal;
