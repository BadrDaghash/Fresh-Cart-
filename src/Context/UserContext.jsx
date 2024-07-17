import { createContext, useState ,useEffect} from "react";

export let UserContext = createContext(0)



export default function UserContextProvider(props) {
    const [userLogin, setUserLogin] = useState(null)
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setUserLogin(localStorage.getItem("userToken"))
        }


}, [])

return <UserContext.Provider value={{ userLogin, setUserLogin }}>
    {props.children}
</UserContext.Provider>
}