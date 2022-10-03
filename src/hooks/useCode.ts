import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { redeemCode } from "../api/Codes";
import { useLoading } from "../context/LoadingContext";
import { useModal } from "../context/ModalContext";
import { useToast } from "../context/ToastContext";

function useCode() {
  const { error, success } = useToast();
  const { setLoading } = useLoading();
  const { hideModal } = useModal();
  const { mutateAsync: redeem, isLoading: redeeming } = useMutation(redeemCode, {
    onSuccess(data) {
      hideModal();
      success("Redeem code thành công");
    },

    onError: (err) => {
      error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });

  useEffect(() => {
    setLoading(redeeming);
  }, [redeeming]);

  return {
    redeem,
  };
}

export default useCode;
