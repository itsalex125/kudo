import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoard, createCard, deleteCard, updateCardUpvotes } from '../utils/api';

const BoardDetail = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [showCardForm, setShowCardForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newCard, setNewCard] = useState({
        title: '',
        description: '',
        media: '',
        author: ''
    });        
    const loadData = async() => {
        try {
            const boardData = await fetchBoard(boardId);
            if(boardData){
                setBoard(boardData);
                setCards(boardData.cards || []);
            }else{
                navigate('/');
            }
        } catch (error){
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        loadData();
        const interval = setInterval(loadData, 1000);
        return () => clearInterval(interval);
    }, [boardId, navigate]);

    const handlCardSubmit = async(e) =>{
        e.preventDefault();
        try{
            await createCard({
                ...newCard,
                title: newCard.title,
                description: newCard.description,
                media: newCard.media,
                author: newCard.author,
                boardId: parseInt(boardId)
            });
            setNewCard({
                title: '',
                description: '',
                media: '',
                author: ''
            });        
            setShowCardForm(false);
            loadData();
        } catch (error) {
            alert("failed to create card");
        }
    };

    const handleUpvote = async(cardId, currentUpvotes) => {
        try{
            await updateCardUpvotes(cardId, currentUpvotes + 1);
            loadData();
        } catch (error) {
            alert("failed to update upvotes");
        }
    };

    const handleDeleteCard = (cardId) => {
        if(window.confirm('Do you want to delete')){
            try{
                deleteCard(cardId);
                loadData();
            }catch (error){
                alert("failed to delete card");
            }
        }
    };

    if(loading){
        return(
            <div className="board-detail">
                <div className="loading">Loading board...</div>
            </div>
        );
    }

    if(!board){
        return(
            <div className="board-detail">
                <div className="error">Board not found</div>
            </div>
        );
    }
    return(
        <div className="board-detail">
            <header className="board-header">
                <button className="back-btn" onClick={()=> navigate('/')}>Back to Dashboard</button>
                <h1>{board.title}</h1>
                <p>{board.description}</p>
                <div className= "board-meta">
                    <span className="category">{board.category}</span>
                    {board.author && <span className="author">by {board.author}</span>}
                </div>
            </header>

            <button className="create-card-btn" onClick={() => setShowCardForm(true)}>
                Add New Card
            </button>

            {showCardForm && (
                <div className="modal-overlay" onClick={(e)=>{
                    if(e.target == e.currentTarget){
                        setShowCardForm(false);
                    }
                    }}>
                    <div className="modal-content">
                        <h2>Create new Cards</h2>
                        <form onSubmit={handlCardSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title *</label>
                                <input 
                                    type="text"
                                    id = "title"
                                    value = {newCard.title}
                                    onChange={(e) => setNewCard({...newCard, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description *</label>
                                <input 
                                    type="text"
                                    id = "description"
                                    value = {newCard.description}
                                    onChange={(e) => setNewCard({...newCard, description: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="gif">GIF URL *</label>
                                <input 
                                    type="text"
                                    id = "gif"
                                    value = {newCard.media}
                                    onChange={(e) => setNewCard({...newCard, media: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="author">Author (Optional)</label>
                                <input 
                                    type="text"
                                    id = "author"
                                    value = {newCard.author}
                                    onChange={(e) => setNewCard({...newCard, author: e.target.value})}
                                />
                            </div>

                            <div className="modal-actions">
                                <button type = "button" onClick={()=> setShowCardForm(false)}>Cancel</button>
                                <button type = "submit">Create Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="cards-grid">
                {cards.map((card)=> (
                    <div key={card.id} className="card">
                        <img src={card.media} alt={card.title} className="card-gif"></img>
                        <div className="card-content">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            {card.author && <p className="author">by {card.author}</p>}
                            <div className="card-actions">
                                <button className="upvote-btn" onClick={()=> handleUpvote(card.id, card.upvotes)}>
                                    👍{card.upvotes}
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteCard(card.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardDetail;