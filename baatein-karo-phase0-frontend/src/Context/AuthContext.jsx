import { createContext, useContext, useEffect, useState } from "react";
import axiosApi from "../config/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getCurrentUser = async()=>{
            try {
               const response = await axiosApi.get(`/user/me`);
            
               setUser(response.data);
                
            } catch (error) {   
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        }
        
        getCurrentUser();
    },[])

    const login = async(email, password)=>{
        try{
            await axiosApi.post("/user/login", {email, password});
            const response = await axiosApi.get("/user/me");
            
            setUser(response.data)
        }
        catch(error){
            setUser(null);
            throw error
        }
    }

    return <AuthContext.Provider value={{user, setUser, loading, setLoading, login}}>{children}</AuthContext.Provider>
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export default AuthProvider;