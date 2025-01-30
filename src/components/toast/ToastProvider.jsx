import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import ToastContainer from "./ToastContainer";
import toastService from "./ToastService";

const ToastContext = createContext({});

export const useNotification = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastService.registerNotification(addNotification);
  }, []);

  useEffect(() => {
    // TODO: Please fix this.
    const id = setInterval(() => {
      // 1. Progress: 100 - 0
      // 2. Duration

      setToasts((prev) => {
        return prev
          .map((toast) => {
            const hundredthPart = 5000 / 100;
            const percentToReduce = 100 / hundredthPart;

            if (toast.preventProgress) {
              return toast;
            }

            //toast.progress = toast.progress - percentToReduce;

            if (toast.progress <= 0) {
              return null;
            }
            return { ...toast, progress: toast.progress - percentToReduce };
          })
          .filter(Boolean);
      });
    }, 100);

    return () => {
      console.log("clear", id);
      clearInterval(id);
    };
  }, []);

  function onRemove(id) {
    setToasts((prev) => {
      return prev.filter((toast) => toast.id !== id);
    });
  }

  function handlePauseNotification(id) {
    setToasts((prev) => {
      return prev.map((toast) => {
        toast.preventProgress = toast.id === id;
        return toast;
      });
    });
  }

  function handleResumeProgressNotification(id) {
    setToasts((prev) => {
      return prev.map((toast) => {
        if (toast.id === id) {
          toast.preventProgress = false;
        }
        return toast;
      });
    });
  }

  function updateToasts(id) {
    setToasts((prev) => {
      return prev.map((toast) => {
        toast.exiting = toast.id === id;
        return toast;
      });
    });
  }

  const addNotification = useCallback(
    ({ title, description, type, cta, position }) => {
      const obj = { title, description, type, cta, position };
      const id = new Date().getTime();

      setToasts((prev) => {
        return [{ ...obj, id, duration: 5000, progress: 100 }, ...prev];
      });
    },
    []
  );

  return (
    <ToastContext.Provider value={addNotification}>
      {children}
      <ToastContainer
        updateToasts={updateToasts}
        toasts={toasts}
        onRemove={onRemove}
        handlePauseNotification={handlePauseNotification}
        handleResumeProgressNotification={handleResumeProgressNotification}
      />
    </ToastContext.Provider>
  );
}
