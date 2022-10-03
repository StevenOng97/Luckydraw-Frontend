import { useContext, createContext } from "react";

export type LoadingContextType = {
  loading: boolean;
  setLoading?: (status: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
});

export const useLoading = () => useContext(LoadingContext);
