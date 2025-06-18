import React, {useState} from 'react';
import { addBoard } from '../utils/storage';

const CreateBoardModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'celebration',
        iamge: '',
        author: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addBoard(formData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div className = "modal-overlay">
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
                        <label htmlFor="image">Image URL *</label>
                        <input 
                            type="url"
                            id="image"
                            name = "image"
                            value={formData.image}
                            onChange={handleChange}
                            required>
                        </input>
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
                        <button type ="button" onclick={onClose} className = "cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Create Board
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBoardModal;