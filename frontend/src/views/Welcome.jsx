import React from 'react'
import Registration from '../components/Registration'
import LogIn from '../components/LogIn'
import GoogleLogin from '../components/GoogleLogIn'
import Guest from '../components/Guest'

const Welcome = props =>{
    return(
        <div className="body two">
            <Registration setUpdate={props.setUpdate} update={props.update}/>
            <div className="column">
                <LogIn setUpdate={props.setUpdate} update={props.update}/>
                <GoogleLogin setUpdate={props.setUpdate} update={props.update}/>
                <Guest setUpdate={props.setUpdate} update={props.update}/>
            </div>
        </div>
    )
}
export default Welcome;