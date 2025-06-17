import React from 'react'
import KudoCard from './KudoCard'

export default function BoardList(){

    return(
    <>
        <div className='search-container'>
            <input className='search-bar' type='text' placeholder='Search Boards...'></input>
            <button className='search-button'>Search</button>
            <button className='clear-button'>Clear</button>
        </div>
        <div className='category-container'>
            <button className='button'>lorem</button>
            <button className='button'>lorem</button>
            <button className='button'>lorem</button>
            <button className='button'>lorem</button>

        </div>
        <div className="board-list-container">
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
            <KudoCard/>
        </div>
    </>
    );
}