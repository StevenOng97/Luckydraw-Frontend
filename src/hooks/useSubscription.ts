import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSubscription, eventSource$ } from 'react-query-subscription';
import {
  getAllCodes,
  createCodes,
  deleteCode as deleteCodeApi,
  updateCode as updateCodeApi,
} from "../api/Codes";
import { useLoading } from "../context/LoadingContext";
import { useModal } from "../context/ModalContext";
import { useToast } from "../context/ToastContext";

function useSubscriptionHook() {
  // const { data, isLoading, isError, error } = useSubscription(
  //   "some-key",
  //   () => eventSource$("/api/v1/sse"),
  //   {
  //     // options
  //   }
  // );

  return {
    // codes,
    // createBatchCodes,
    // deleteCode,
    // updateCode,
  };
}

export default useSubscriptionHook;
