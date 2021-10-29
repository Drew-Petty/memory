import React from 'react'

const Pagination = props =>{
    const start = e =>{
        props.setPage(1)
    }
    const end = e =>{
        props.setPage(props.totalPages)
    }
    const prev = e =>{
        props.setPage(props.page-1)
    }
    const prevPrev = e =>{
        props.setPage(props.page-2)
    }
    const next = e =>{
        props.setPage(props.page+1)
    }
    const nextNext = e =>{
        props.setPage(props.page+1)
    }

    return(
        <div className="pagination">
            <h3>Page {props.page} of {props.totalPages}</h3>
            <div className="buttonGroup">
                <button className={'pageButton'} onClick={start}>Start</button>
                {props.page>2?<button className={'pageButton'} onClick={prevPrev}>{props.page-2}</button>:''}
                {props.page>1?<button className={'pageButton'} onClick={prev}>{props.page-1}</button>:''}
                <button className={'pageButton currentPage'}>{props.page}</button>
                {props.page<props.totalPages?<button className={'pageButton'} onClick={next}>{props.page+1}</button>:''}
                {props.page<props.totalPages-1?<button className={'pageButton'} onClick={nextNext}>{props.page+2}</button>:''}
                <button className={'pageButton'} onClick={end}>End</button>
            </div>
        </div>
    )
}
export default Pagination;