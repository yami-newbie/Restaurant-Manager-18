import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const context = createContext();

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export const useAlertService = () => {
  return useContext(context);
};

export default function ProviderAlertService({ children }) {
  const value = AlertService();
  const interval = useRef();

  useEffect(() => {
    if (value.show) {
      clearInterval(interval.current);
      interval.current = setInterval(() => {
        value.hideAlert();
      }, value.time);
    }
  }, [value]);

  return (
    <context.Provider value={value}>
      <>
        {children}

        <Snackbar
          open={value.show}
          //   autoHideDuration={6000}
          TransitionComponent={SlideTransition}
          onClose={value.hideAlert}
        >
          <Alert
            variant="filled"
            onClose={value.hideAlert}
            // sx={{ position: "absolute", right: "32px", bottom: "32px" }}
            severity={value.type}
          >
            {value.title ? <AlertTitle>{value.title}</AlertTitle> : null}
            {value.body}
          </Alert>
        </Snackbar>
      </>
    </context.Provider>
  );
}

function AlertService() {
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [time, setTime] = useState(3000);
  const [show, setShow] = useState(false);

  const setAlert = ({ type, title, body }) => {
    setBody(body);
    setType(type);
    setTitle(title);
  };

  const showAlert = (time = 3000) => {
    setTime(time);
    setShow(true);
  };

  const hideAlert = () => {
    setShow(false);
  };

  return {
    type,
    title,
    body,
    time,
    show,
    setAlert,
    showAlert,
    hideAlert,
  };
}
