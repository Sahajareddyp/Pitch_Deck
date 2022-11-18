import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [session, setSession] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        session,
        setSession,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;