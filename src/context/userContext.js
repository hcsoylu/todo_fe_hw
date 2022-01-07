import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { url } from "../url/url";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      const { data } = await axios.get(`${url}/auth/me`, {
        withCredentials: true,
      });

      setUser(data.user);
    };

    getMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
