import React, {useState} from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

const Guest = props =>{
    const [myForm] = useState({
        email: 'guest@guest.com',
        password: 'MKO)9ijn',
    })

    const guestLogin = e =>{
        e.preventDefault()
        // axios.post("http://localhost:8000/api/login", myForm, {withCredentials:true})
        axios.post("/backend/api/login", myForm, {withCredentials:true})
        .then(res=>{
            props.setUpdate(!props.update)
            navigate("/home")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <button className="button" onClick={guestLogin}>Continue as Guest</button>
        )
}
export default Guest