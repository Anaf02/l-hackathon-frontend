import React, { useState } from "react";
import axios from "axios";

import useLocalStorage from "../localStorageHook";
import { SimpleLoginModel } from "./SimpleLoginModel";
import { simpleAuthContext } from "./SimpleAuthContext";
import { SimpleUserModel } from "./SimpleUserModel";

interface Props {
  children: JSX.Element;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useLocalStorage(
    "userData",
    {} as SimpleUserModel
  );
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );

  const login = React.useCallback(
    async (formData: SimpleLoginModel) => {
      let users: SimpleUserModel[] = await axios
        .get<SimpleUserModel[]>(`${process.env.REACT_APP_BASE_URL}/user`)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error("Error fetching users", error);
          return [];
        });

      const user = Object.values(users).find(
        (u) =>
          u.username === formData.username && u.password === formData.password
      );
      if (!!user) {
        setIsAuthenticated(true);
        setUserData(user);
        return true;
      } else {
        return false;
      }
    },
    [setIsAuthenticated, setUserData]
  );

  const logout = React.useCallback(async () => {
    setUserData({} as SimpleUserModel);
    setIsAuthenticated(false);
  }, [setIsAuthenticated, setUserData]);

  return (
    <simpleAuthContext.Provider
      value={{
        userData,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </simpleAuthContext.Provider>
  );
};
