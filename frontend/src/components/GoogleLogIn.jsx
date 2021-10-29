import { navigate } from '@reach/router'
import axios from 'axios';
import React from 'react'
import { GoogleLogin } from 'react-google-login';

const clientId = "871843224583-78n4pc3808do7une5jrf94bmhef4385q.apps.googleusercontent.com"

const GoogleLoginComponent = props =>{

    const googleSuccess = async (response)=>{
        const form = {
            email: response.profileObj.email,
            name: response.profileObj.name,
        }
        // axios.post("http://localhost:8000/api/googleLogIn", form, {withCredentials:true})
        axios.post("/backend/api/googleLogIn", form, {withCredentials:true})
        .then(res=>{
            props.setUpdate(!props.update)
            navigate("/home")
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const googleFailure = (response) =>{
        console.log("Google sign in was unsuccessful")
        console.log(response)
    }

    return(
        <GoogleLogin
        onFailure={googleFailure}
        onSuccess={googleSuccess}
        clientId={clientId}
        cookiePolicy={'single_host_origin'}
        />
    )
}
export default GoogleLoginComponent;