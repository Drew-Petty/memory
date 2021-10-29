import React,  {useState, useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../App'

const AddCard = props =>{
    const [file, setFile]= useState('')
    const user = useContext(UserContext)
    const [errors, setErrors] = useState({})

    const onChangeFile = e =>{
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader()
            reader.onload = e =>{
                const img = new Image()
                img.onload =()=>{
                    setErrors({})
                }
                img.onerror =()=>{
                    console.log('error')
                    setErrors({...errors,notImage:"A file must be an image"})
                    return false
                }
                img.src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0])
        }
        setFile(e.target.files[0]);
    }

    const checkForErrors=()=>{
        let errs = false
        if(file === ''){
            setErrors({...errors,file:"A file must be present"})
            errs=true
        }
        if(!file.name.match(/\.(jpg|jpeg|png|gif)$/)){
            setErrors({...errors,file:"file type not accepted"})
            errs=true
        }
        if(errors.notImage){
            errs=true
        }
        return errs
    }

    const addCardOnSubmitHandler = e =>{
        e.preventDefault()
        if(checkForErrors()===false){
            const formData = new FormData();
            formData.append('deckName', props.deckName)
            formData.append('email',user.email)
            formData.append('file',file)
            formData.append('aspectRatio', props.aspectRatio)
            // axios.post("http://localhost:8000/api/card/create", formData, {
            axios.post("/backend/api/card/create", formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            .then(res=>{
                setFile('')
                props.giveUpdate()
            })
            .catch(err=>console.log(err))
        }
        e.target.reset()
    }

    return(
        <div className="body">
            <form className="form" onSubmit={addCardOnSubmitHandler}>
                <h3>Add a card to the deck {props.deckName}</h3>
                <p className="formRow">
                    <label htmlFor="file">Choose Image:</label>
                    <input className="file" type="file" name="file" onChange={onChangeFile}/>
                </p>
                {errors.file?<p className="error">{errors.file}</p>:""}
                {errors.notImage?<p className="error">{errors.notImage}</p>:""}
                <input className="button" type="submit" value="Enter"/>
            </form>
        </div>
    )
}
export default AddCard; 