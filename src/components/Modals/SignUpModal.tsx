import React, { FC } from "react";
import formData from "../../helpers/informationForm";
import Form from "../Form";
import FormInput from "../FormInput";
import Modal from "./Modal";
import {
  UseFormReturn,
  Control,
  FieldErrorsImpl,
  useForm,
} from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../hooks/useAuth";
import SignInModal from "./SignInModal";

const SignUpModal: FC = () => {
  const { register: registerFn, login } = useAuth();
  const { hideModal, showModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    mode: "all",
  });

  const showLoginModal = () => {
    hideModal();
    setTimeout(() => {
      showModal(<SignInModal />);
    }, 300);
  };

  const onSubmit = handleSubmit(async (data) => {
    data.phone = data.phone.replace(/[^0-9]+/g, "");

    const finalData = JSON.parse(JSON.stringify(data));

    try {
      await registerFn(finalData);
      const { email, password } = finalData;
      await login({ email, password });
      hideModal();
    } catch (err) {
      setError("phone", {
        type: "wrong-code",
        message: err?.response?.data[0],
      });
    }

    // const res = await fetch(`${apiUrl}/users`, {
    //   method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    //   body: JSON.stringify(finalData),
    // });

    // const user = await res.json();
    // setCurrentUser(JSON.stringify(user));
    // setOpenModal(false);
    // setLoading(false);
    // setUser(user);

    // fetchCodes(user._id);
  });

  return (
    <Form submit={handleSubmit(onSubmit)} loading={false}>
      <h5 className="text-center font-bold text-2xl">Form Đăng kí</h5>
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
      <p className="mb-4">
        Đã có tài khoản? vui lòng Click{" "}
        <a onClick={showLoginModal} className="cursor-pointer text-blue-500">
          vào đây
        </a>{" "}
        để đăng nhập
      </p>
    </Form>
  );
};

export default SignUpModal;
