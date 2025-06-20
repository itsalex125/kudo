import React, { useState } from 'react';

const GiphySearch = ({ onGifSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ gifs, setGifs ] = useState([]);

    const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
    const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

    const searchGifs = async() => {
        if(!searchTerm.trim()) return;

        const response = await fetch(`${GIPHY_API_URL}?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
        const data = await response.json();
        setGifs(data.data || [] );
    }

    const handleSearch = (e) => {
        e.preventDefault();
        searchGifs();
    }

    const handleGifClick = (gif) =>{
        const gifUrl = gif.images.original.url;
        onGifSelect(gifUrl);
    }

    return(
        <div className="giphy-search">
            <div onSubmit={handleSearch} className='giphy-search-form'>
                <div className='search-input-group'>
                    <input
                        type= "text"
                        value= {searchTerm}
                        onChange= {(e) => setSearchTerm(e.target.value)}
                        placeholder= "Search for GIFs..."
                        className= "giphy-search-input">
                        </input>
                    <button
                        type = "button"
                        className= "giphy-search-btn"
                        onClick={searchGifs}
                    >Search</button>
                </div>
            </div>

            {gifs.length > 0 && (
                <div className= "giphy-results">
                    <h4>Click on a GIF to select!</h4>
                    <div className= "giphy-grid">
                        {gifs.map((gif) => ( 
                        <div
                            key = {gif.id}
                            className = "giphy-item"
                            onClick={() => handleGifClick(gif)}
                        >
                            <img 
                                src={gif.images.fixed_height_small.url}
                                alt={gif.title}
                                className="giphy-thumbnail"
                            />
                        </div>
                        ))}
                    </div>    
                </div>
                )}
        </div>
    )
}

export default GiphySearch;