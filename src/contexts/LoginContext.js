import { createContext, useState, useContext } from "react";
import axios from "axios";

export const LoginContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");


  const handleLogin = async (email, password) => {
    const body = {
      email, password
    }

    const response = await axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`, body);
    localStorage.setItem("image", JSON.stringify(response.data.image));
    localStorage.setItem("keepUser", JSON.stringify(response));
    setUser(response.data);
    setToken(response.data.token);
  }

  console.log(token);


  return (
    <LoginContext.Provider value={{ handleLogin, user, token }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginProvider = () => {
  const context = useContext(LoginContext);

  return context;
}