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
            <button className='all-button'>All</button>
            <button className='recent-button'>Recent</button>
            <button className='celebration-button'>Celebration</button>
            <button className='thank-you-button'>Thank You</button>
            <button className='inspiration-button'>Inspiration</button>

        </div>
        <button className='create'>Create New Board</button>
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