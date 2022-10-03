import React, { FC } from "react";
import formData from "../../helpers/codeInputForm";
import Form from "../Form";
import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import useCode from "../../hooks/useCode";
import { useSubscription, eventSource$ } from "react-query-subscription";
import Constants from "../../constants";
import { EventSourcePolyfill } from "event-source-polyfill";
import { storage } from "../../helpers/helper";

const RedeemCodeModal: FC = () => {
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

  const { redeem } = useCode();

  const onSubmit = handleSubmit(async (data) => {
    const finalData = JSON.parse(JSON.stringify(data));

    try {
      const res = await redeem(finalData);
      const {
        code: { id },
      } = res;

      if ("EventSource" in window) {
        let source = new EventSourcePolyfill(
          `${Constants.API_URL}/codes/redeem/${id}`,
          {
            headers: {
              Authorization: "Bearer " + storage.getToken(),
            },
          }
        );

        source.addEventListener(
          "message",
          function (e) {
            console.log(e.data);
          },
          false
        );

        source.addEventListener(
          "open",
          function (e) {
            // successful connection.
          },
          false
        );

        source.addEventListener(
          "error",
          function (e) {
            // error occurred
          },
          false
        );
      }

    } catch (err) {
      setError("phone", {
        type: "wrong-code",
        message: err?.response?.data[0],
      });
    }
  });

  return (
    <Form submit={onSubmit} loading={false}>
      <h5 className="text-center font-bold text-2xl">Hãy nhập mã code</h5>

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

export default RedeemCodeModal;
