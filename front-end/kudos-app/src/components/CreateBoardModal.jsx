import React, {useState} from 'react';
import GiphySearch from './GiphySearch';

const CreateBoardModal = ({ onClose, onBoardCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'celebration',
        image: '',
        author: ''
    });
    const [loading, setLoading] = useState(false);
    const [showGiphySearch, setShowGiphySearch] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        setFormData({
        title: '',
        description: '',
        category: 'celebration',
        image: '',
        author: ''
        });
        setLoading(true);

        try{
            if(onBoardCreated){
                onBoardCreated(formData);
            }else{
                onClose();
            }
        }catch (error){
            alert('Failed to create the Board')
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGifSelect = (gifUrl) => {
        setFormData(prev => ({...prev, image: gifUrl}));
        setShowGiphySearch(false);
    }

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return(
        <div className = "modal-overlay" onClick={handleOverlayClick}>
            <div className = "modal-content">
                <h2>Create New Board</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input 
                            type ="text"
                            id = "title"
                            name = "title"
                            value= {formData.title}
                            onChange = {handleChange}
                            required>
                            </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea 
                            id = "description"
                            name = "description"
                            value= {formData.description}
                            onChange = {handleChange}
                            required>
                            </textarea>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="category">Category *</label>
                        <select 
                            id = "category"
                            name = "category"
                            value = {formData.category}
                            onChange={handleChange}
                            required>
                                <option value = "celebration">Celebration</option>
                                <option value = "thank-you">Thank You</option>
                                <option value = "inspiration">Inspiration</option>
                            </select>
                    </div>
                    <div className="form-group">
                    
                           <label htmlFor="gif">GIF URL *</label>
                                <div className= "gif-input-group">                                
                                <input 
                                    type="text"
                                    id = "gif"
                                    value = {formData.image}
                                    onChange={handleChange}
                                    required
                                    placeholder='Enter GIF URL or search for one below'
                                />
                                <button 
                                    type='button'
                                    className='search-gif-btn'
                                    onClick={() => setShowGiphySearch(!showGiphySearch)}>
                                        Search GIFs
                                    </button>
                                </div>
                                {showGiphySearch && (
                                    <GiphySearch onGifSelect={handleGifSelect}/>
                                )}
                    </div>
                    <div className="modal-actions">
                        <label htmlFor="author">Author (Optional)</label>
                        <input 
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="modal-actions">
                        <button type ="button" onClick={onClose} className = "cancel-btn" disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Creating..." : "Create Board"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBoardModal;