import React from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'
const LogOut = props =>{

    const logout = e =>{
        // axios.get("http://localhost:8000/api/logout",{withCredentials:true})
        axios.get("/backend/api/logout",{withCredentials:true})
        .then(res=>{
            navigate("/")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <button onClick={logout}>Log Out</button>
    )
}
export default LogOut;