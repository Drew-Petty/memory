import React, {useState} from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'
const LogIn = props =>{
    const [myForm, setMyForm] = useState({})
    const [errors, setErrors] = useState({})

    const onChangeHandler = e =>{
        setMyForm({...myForm,[e.target.name]:e.target.value})
    }

    const onSubmitHandler = e =>{
        e.preventDefault()
        // axios.post("http://localhost:8000/api/login",myForm,{withCredentials:true})
        axios.post("/backend/api/login",myForm,{withCredentials:true})
        .then(res=>{
            if(res.data.message!== "success"){
                setErrors(res.data)
            }else{
                props.setUpdate(!props.update)
                navigate("/home")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <form className="form" onSubmit={onSubmitHandler}>
            <h3>Log In</h3>
            {errors.message?<p className="error">{errors.message}</p>:""}
            <p className="formRow">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" onChange={onChangeHandler}/>
            </p>
            {errors.password?<p className="error">{errors.password.message}</p>:""}
            <p className="formRow">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={onChangeHandler}/>
            </p>
            <input className="button" type="submit" value="Log in"/>
        </form>
    )
}
export default LogIn;