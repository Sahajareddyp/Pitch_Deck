import { createContext, useState } from "react";

export const ToastContext = createContext();

const ToastContextProvider = (props) => {
  const [openToast, setOpenToast] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [severity, setSeverity] = useState("success");

  return (
    <ToastContext.Provider
      value={{
        openToast,
        setOpenToast,
        toastContent,
        setToastContent,
        severity,
        setSeverity,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;