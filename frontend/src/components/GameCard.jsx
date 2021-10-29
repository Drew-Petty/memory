import React, {useEffect, useState} from 'react'
import Flippy, {BackSide, FrontSide} from 'react-flippy'

const GameCard = props =>{
    const [attributes, setAttributes]=useState({
        flipped:false,
        matched:false,
        fileName:null,
    })
    //sets to matched or flips card back over
    useEffect(()=>{
        if(props.matches.includes(props.index)){
            // setAttributes({flipped:true, matched:true, fileName:`http://localhost:8000/uploads/${props.card.fileName}`})
            setAttributes({flipped:true, matched:true, fileName:`/backend/uploads/${props.card.fileName}`})
        }else{
            // setAttributes({matched:false, flipped:false, fileName:`http://localhost:8000/uploads/${props.card.fileName}`})
            setAttributes({matched:false, flipped:false, fileName:`/backend/uploads/${props.card.fileName}`})
            let t = setTimeout(()=>setAttributes({matched:false, fileName:null, flipped:false}),400)
            return ()=>clearTimeout(t)
        }
    },[props.matches, props.index, props.card.fileName, props.reset])

    //flips card over if not already matched
    useEffect(()=>{
        if(props.index === props.flipped && attributes.matched === false && attributes.flipped === false){
            // setAttributes({matched:false, flipped:false, fileName:`http://localhost:8000/uploads/${props.card.fileName}`})
            setAttributes({matched:false, flipped:false, fileName:`/backend/uploads/${props.card.fileName}`})
            // let timer = setTimeout(()=>setAttributes({matched:false, flipped:true, fileName:`http://localhost:8000/uploads/${props.card.fileName}`}),100)
            let timer = setTimeout(()=>setAttributes({matched:false, flipped:true, fileName:`/backend/uploads/${props.card.fileName}`}),100)
            return ()=>clearTimeout(timer)
        }
        
    },[attributes.matched, attributes.flipped, props.click, props.card.fileName, props.index, props.flipped])

    const flip = ()=>{
        props.action(props.index)
    }
    return(
        <Flippy onClick={flip} isFlipped={attributes.flipped} flipOnClick={false} id={'gameCard'} style={{width:`${props.dimensions.cardWidth}px`, height:`${props.dimensions.cardHeight}px`}}>
            <FrontSide id={'flippyFront'}/>
            <BackSide id={'flippyBack'}><img className="gamePicture" src={attributes.fileName} alt="" /></BackSide>
        </Flippy>
        )
}
export default GameCard
