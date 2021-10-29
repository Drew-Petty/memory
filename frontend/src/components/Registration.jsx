import React, {useState} from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'


const Registration = props =>{
    
    const [myForm, setMyForm] = useState({})
    const [errors, setErrors] = useState({})

    const onSubmitHandler = e =>{
        e.preventDefault()
        // axios.post("http://localhost:8000/api/register", myForm, {withCredentials:true})
        axios.post("/backend/api/register", myForm, {withCredentials:true})
        .then(res=>{
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                props.setUpdate(!props.update)
                navigate("/home")
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const onChangeHandler = e =>{
        setMyForm({...myForm,[e.target.name]:e.target.value})
    }

    return(
        <form className="form" onSubmit={onSubmitHandler}>
            <h3>Register</h3>
            {errors.name?<p className="error">{errors.name.message}</p>:""}
            <p className="formRow">
                <label htmlFor="name">Full Name:</label>
                <input type="text" name="name" onChange={onChangeHandler}/>
            </p>
            {errors.email?<p className="error">{errors.email.message}</p>:""}
            <p className="formRow">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" onChange={onChangeHandler}/>
            </p>
            {errors.password?<p className="error">{errors.password.message}</p>:""}
            <p className="formRow">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={onChangeHandler}/>
            </p>
            {errors.confirm?<p className="error">{errors.confirm.message}</p>:""}
            <p className="formRow">
                <label htmlFor="confirm">Confirm Password:</label>
                <input type="password" name="confirm" onChange={onChangeHandler}/>
            </p>
            <input className="button" type="submit" value="Register"/>
        </form>
    )
}
export default Registration;