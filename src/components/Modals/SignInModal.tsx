import React, { FC } from "react";
import formData from "../../helpers/loginForm";
import Form from "../Form";
import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../hooks/useAuth";

const SignInModal: FC = () => {
  const { login } = useAuth();
  const { hideModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    mode: "all",
  });

  const onSubmit = handleSubmit(async (data) => {
    const finalData = JSON.parse(JSON.stringify(data));

    try {
      await login(finalData);
      hideModal();
    } catch (err) {
      setError("phone", {
        type: "wrong-code",
        message: err?.response?.data[0],
      });
    }
  });

  return (
    <Form submit={onSubmit} loading={false}>
      <h5 className="text-center font-bold text-2xl">Form Đăng Nhập</h5>

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

export default SignInModal;
