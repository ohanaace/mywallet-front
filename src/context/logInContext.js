import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext()


export default function UserProvider({ children }) {

    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [onlineUser, setOnlineUser] = useState(lsUser !== null ? lsUser: {})
    const navigate = useNavigate()

    useEffect(() => {
        if (lsUser === null) {
            navigate("/")
        } else {
            navigate("/home")
        }
    }, [])

    return (
        <UserContext.Provider value={{ onlineUser, setOnlineUser }}>
            {children}
        </UserContext.Provider>
    )
}
