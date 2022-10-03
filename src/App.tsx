import classnames from "classnames";
import React, { useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import { LoadingContext } from "./context/LoadingContext";
import { AuthProvider } from "./hooks/useAuth";
import { ReactQueryProvider } from "./lib/react-query";
import IndexPage from "./module/IndexPage";
import ModalProvider from "./providers/ModalProvider";
import ToastProvider from "./providers/ToastProvider";

function App() {
  const [loading, setLoading] = useState(true);

  const appWrapperClassName = classnames("", {
    ["opacity-50 pointer-events-none"]: loading,
  });

  return (
    <div className="App">
      <ReactQueryProvider>
        <AuthProvider>
          <LoadingContext.Provider
            value={{
              loading: loading,
              setLoading: setLoading,
            }}
          >
            <ToastProvider>
              <ModalProvider>
                <div className={appWrapperClassName}>
                  <IndexPage />

                  {loading && <Loading />}
                </div>
              </ModalProvider>
            </ToastProvider>
          </LoadingContext.Provider>
        </AuthProvider>
      </ReactQueryProvider>
    </div>
  );
}

export default App;
