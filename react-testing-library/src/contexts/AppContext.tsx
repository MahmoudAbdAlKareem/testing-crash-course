import React, { FC, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";

interface AppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  showSnackbar: (message: string) => void;
}

export const Context = React.createContext<AppContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  showSnackbar: () => {},
});

const AppContext: FC<any> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    // You can read the token & authenticate the user if you \
  }, []);

  const showSnackbar = (message: string) => {
    setMessage(message);
    setIsSnackbarOpen(true);
  };
  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        showSnackbar,
      }}
    >
      <Snackbar open={isSnackbarOpen} onClose={handleClose} message={message} />
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => React.useContext(Context);

export default AppContext;
