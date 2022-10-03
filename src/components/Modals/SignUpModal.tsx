import React, { FC } from 'react';
import formData from '../../helpers/informationForm';
import Form from '../Form';
import FormInput from '../FormInput';
import Modal from './Modal';
import { UseFormReturn, Control, FieldErrorsImpl } from 'react-hook-form';

interface SignUpModalProps {
  setOpenModal: (status: boolean) => void;
  onSubmit: () => void;
  isOpenModal: boolean;
  isLoading: boolean;
  register?: UseFormReturn['register'];
  errors?: FieldErrorsImpl;
  control?: Control;
}

const SignUpModal: FC<SignUpModalProps> = ({
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
    <Modal
      title="Form đăng ký"
      setModalState={setOpenModal}
      isOpen={isOpenModal}
    >
      {renderInformationForm()}
    </Modal>
  );
};

export default SignUpModal;
