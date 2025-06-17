import React from 'react'
import './css/KudoCard.css'
import myImage from './assets/placeholder.png'
export default function KudoCard(){

    return(
        <div className="kudo-card">
            <img src = {myImage}></img>
            <h3 className = 'card-title'>Lorem, ipsum dolor.</h3>
            <p className = 'category'>Lorem ipsum dolor sit.</p>
            <div className='button-container'>
                <button className='view'>View Board</button>
                <button className = 'delete'>Delete</button>
            </div>    
        </div>
    );
}