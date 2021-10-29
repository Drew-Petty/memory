import React, {useEffect, useContext} from 'react'
import Navbar from '../components/Navbar'
import DeckSelect from '../components/DeckSelect'
import { UserContext } from '../App'
import { navigate } from '@reach/router'



const Profile = props =>{
    const user = useContext(UserContext)

    useEffect(()=>{
        if(user.email === 'guest@guest.com'){
            navigate('/home')
        }
    })

    return(
        <div className="page">
            <Navbar/>
            <DeckSelect/>
        </div>
    )
}
export default Profile;