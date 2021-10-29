import React,  {useState, useEffect, useContext, useRef} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { UserContext } from '../App'
import { navigate } from '@reach/router'

const NewDeck = props =>{
    const [deckName, setDeckName] = useState(null);
    const [deckNames, setDeckNames] = useState([])
    const [file, setFile]= useState('')
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState(null)
    const user = useContext(UserContext)
    const imageRef = useRef()

    useEffect(()=>{
        // axios.get("http://localhost:8000/api/card/deckNames")
        axios.get("/backend/api/card/deckNames")
        .then(res=>{
            setDeckNames(res.data.names)
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
    const onChangeFile = e =>{
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader()
            reader.onload = e =>{
                const img = new Image()
                img.onload =()=>{
                    setImage(e.target.result)
                }
                img.onerror =()=>{
                    setErrors({...errors,notImage:"A file must be an image"})
                    return false
                }
                img.src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0])
        }
        setFile(e.target.files[0]);
    }



    const onChangeDeckName = e =>{
        setDeckName(e.target.value)
    }
    const checkForErrors = ()=>{
        let errs = false
        if(deckName==null ||deckName.length<5){
            setErrors({...errors,deckName:"Deck name must be longer than 4 characters"})
            errs=true
        }
        if(file === ''){
            setErrors({...errors,file:"A file must be present"})
            errs=true
        }
        if(deckNames.includes(deckName)){
            setErrors({...errors,deckName:"Deck name has been taken"})
            errs=true
        }
        if(!file.name.match(/\.(jpg|jpeg|png|gif)$/)){
            setErrors({...errors,file:"file type not accepted"})
            errs=true
        }
        if(errors.notImage){
            errs=true
        }
        console.log(file)


        return errs
    }
    const newDeckOnSubmitHandler = e =>{
        e.preventDefault()
        if(checkForErrors()===false){
            let aspectRatio = imageRef.current.width / imageRef.current.height
            const formData = new FormData();
            formData.append('deckName', deckName)
            formData.append('email', user.email)
            formData.append('file', file)
            formData.append('aspectRatio', aspectRatio)
            // axios.post("http://localhost:8000/api/card/create", formData, {
            axios.post("/backend/api/card/create", formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(res=>{
                navigate(`/deck/${deckName}`)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        e.target.reset()
    }
    return(
        <div className="page">
            <Navbar/>
            <div className="body">
                <form className="form" onSubmit={newDeckOnSubmitHandler}>
                    <h3>Enter the New Deck's name</h3>
                    {errors.deckName?<p className="error">{errors.deckName}</p>:""}
                    <p className="formRow">
                        <label htmlFor="name">Deck Name:</label>
                        <input type="text" name="name" onChange={onChangeDeckName}/>
                    </p>
                    {errors.file?<p className="error">{errors.file}</p>:""}
                    {errors.notImage?<p className="error">{errors.notImage}</p>:""}
                    <p className="formRow">
                        <label htmlFor="file">First Image:</label>
                        <input className="file" type="file" name="file" onChange={onChangeFile}/>
                    </p>
                    {image?<img className="imagePreview" ref={imageRef} src={image} alt="" />:''}
                    <input className="button" type="submit" value="Enter"/>
                </form>
            </div>
        </div>
    )
}
export default NewDeck;