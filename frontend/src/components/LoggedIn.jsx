// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { navigate } from '@reach/router'

// const LoggedIn = props =>{
//     const [user, setUser] = useState({})
//     useEffect(()=>{
//         axios.get("http://localhost:8000/api/loggedIn",{withCredentials:true})
//         .then(res=>{
//             setUser(res.data.user)
//         })
//         .catch(err=>{
//             navigate("/")
//         })
//     },[])
    
//     useEffect(()=>{
//         if(props.processUser){
//             props.processUser(user)
//         }
//     },[user])

//     return(
//         <span>Hello {user.name}</span>
//     )
// }
// export default LoggedIn;